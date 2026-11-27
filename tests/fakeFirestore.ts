/** Minimal in-memory stand-in for the slice of Firestore the app uses. */
type Doc = Record<string, any>;

export class FakeFirestore {
  data = new Map<string, Map<string, Doc>>();
  private n = 0;

  private col(name: string) {
    if (!this.data.has(name)) this.data.set(name, new Map());
    return this.data.get(name)!;
  }

  private docRef(colName: string, id: string) {
    const col = this.col(colName);
    const ref: any = {
      id,
      _col: colName,
      get: async () => ({ id, exists: col.has(id), data: () => (col.has(id) ? { ...col.get(id)! } : undefined), ref }),
      set: async (d: Doc) => void col.set(id, { ...d }),
      update: async (d: Doc) => {
        if (!col.has(id)) throw new Error(`no document to update: ${colName}/${id}`);
        col.set(id, { ...col.get(id)!, ...d });
      },
    };
    return ref;
  }

  collection(name: string) {
    const self = this;
    const query = (filters: [string, any][], max: number) => ({
      where: (f: string, _op: string, v: any) => query([...filters, [f, v]], max),
      limit: (m: number) => query(filters, m),
      get: async () => {
        const docs = [...self.col(name).entries()]
          .filter(([, d]) => filters.every(([f, v]) => d[f] === v))
          .slice(0, max)
          .map(([id, d]) => ({ id, data: () => ({ ...d }), ref: self.docRef(name, id) }));
        return { empty: docs.length === 0, docs };
      },
    });
    return {
      doc: (id: string) => self.docRef(name, id),
      add: async (d: Doc) => {
        const id = `auto${++self.n}`;
        self.col(name).set(id, { ...d });
        return self.docRef(name, id);
      },
      ...query([], Infinity),
    };
  }

  async runTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    const writes: (() => Promise<unknown>)[] = [];
    const tx = {
      get: (ref: any) => ref.get(),
      set: (ref: any, d: Doc) => writes.push(() => ref.set(d)),
      update: (ref: any, d: Doc) => writes.push(() => ref.update(d)),
    };
    const out = await fn(tx);
    for (const w of writes) await w(); // commit
    return out;
  }
}
