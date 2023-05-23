import { atom, useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';

type Item = {
  id: string;
  index: number;
};
const createItemAtom = (index: number) => atom<Item>({ id: nanoid(), index });

type ItemAtom = ReturnType<typeof createItemAtom>;

type Line = {
  id: string;
  index: number;
  itemAtoms: ItemAtom[];
};
const createLineAtom = (index: number) => atom<Line>({ id: nanoid(), index, itemAtoms: [] });

type LineAtom = ReturnType<typeof createLineAtom>;

const linesAtom = atom<LineAtom[]>([]);

const addLineAtom = atom(null, (get, set) => {
  set(linesAtom, [...get(linesAtom), createLineAtom(get(linesAtom).length)]);
});

const removeItemAtom = atom(
  null,
  (get, set, targetLineAtom: LineAtom, targetItemAtom: ItemAtom) => {
    set(
      linesAtom,
      get(linesAtom).map((lineAtom) => {
        if (lineAtom !== targetLineAtom) return lineAtom;
        const { itemAtoms, ...other } = get(lineAtom);
        const newItemAtoms = itemAtoms.filter((itemAtom) => itemAtom !== targetItemAtom);
        return atom({
          ...other,
          itemAtoms: newItemAtoms,
        });
      })
    );
  }
);

const Item = ({ itemAtom, lineAtom }: { itemAtom: ItemAtom; lineAtom: LineAtom }) => {
  const item = useAtomValue(itemAtom);
  const removeItem = useSetAtom(removeItemAtom);
  return (
    <div style={{ padding: '4px', border: 'solid 1px white' }}>
      <div>Item : {item.id}</div>
      <div>{item.index}</div>
      <button onClick={() => removeItem(lineAtom, itemAtom)}>Delete</button>
    </div>
  );
};

const addItemAtom = atom(null, (get, set, lineAtom: LineAtom) => {
  const line = get(lineAtom);
  set(lineAtom, { ...line, itemAtoms: [...line.itemAtoms, createItemAtom(line.itemAtoms.length)] });
});

const removeLineAtom = atom(null, (get, set, targetLineAtom: LineAtom) => {
  set(
    linesAtom,
    get(linesAtom).filter((lineAtom) => lineAtom !== targetLineAtom)
  );
});

const Line = ({ lineAtom }: { lineAtom: LineAtom }) => {
  const line = useAtomValue(lineAtom);
  const addItem = useSetAtom(addItemAtom);
  const removeLine = useSetAtom(removeLineAtom);
  return (
    <div style={{ padding: '8px', border: 'solid 1px white' }}>
      <h2>Line {line.index}</h2>
      <div style={{ display: 'flex' }}>
        {line.itemAtoms.map((itemAtom) => (
          <Item key={itemAtom.toString()} itemAtom={itemAtom} lineAtom={lineAtom} />
        ))}
        <button onClick={() => removeLine(lineAtom)}>Delete</button>
      </div>
      <button onClick={() => addItem(lineAtom)}>Add Item</button>
    </div>
  );
};

const Main = () => {
  const lineAtoms = useAtomValue(linesAtom);
  const addLine = useSetAtom(addLineAtom);
  return (
    <div>
      {lineAtoms.map((lineAtom) => (
        <Line key={lineAtom.toString()} lineAtom={lineAtom} />
      ))}
      <button onClick={() => addLine()}>Add Line</button>
    </div>
  );
};

function App() {
  return (
    <div style={{ margin: '0 24px' }}>
      <h1>Kintone Form App Example</h1>
      <Main />
    </div>
  );
}

export default App;
