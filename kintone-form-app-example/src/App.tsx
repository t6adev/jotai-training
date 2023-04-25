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
  items: ItemAtom[];
};
const createLineAtom = (index: number) => atom<Line>({ id: nanoid(), index, items: [] });

type LineAtom = ReturnType<typeof createLineAtom>;

const linesAtom = atom<LineAtom[]>([]);

const addLineAtom = atom(null, (get, set) => {
  set(linesAtom, [...get(linesAtom), createLineAtom(get(linesAtom).length)]);
});

const Item = ({ itemAtom }: { itemAtom: ItemAtom }) => {
  const item = useAtomValue(itemAtom);
  return (
    <div style={{ padding: '4px', border: 'solid 1px white' }}>
      <div>Item : {item.id}</div>
      <div>{item.index}</div>
    </div>
  );
};

const addItemAtom = atom(null, (get, set, lineAtom: LineAtom) => {
  const line = get(lineAtom);
  set(lineAtom, { ...line, items: [...line.items, createItemAtom(line.items.length)] });
});

const Line = ({ lineAtom }: { lineAtom: LineAtom }) => {
  const line = useAtomValue(lineAtom);
  const addItem = useSetAtom(addItemAtom);
  return (
    <div style={{ padding: '8px', border: 'solid 1px white' }}>
      <h2>Line {line.index}</h2>
      <div style={{ display: 'flex' }}>
        {line.items.map((itemAtom) => (
          <Item key={itemAtom.toString()} itemAtom={itemAtom} />
        ))}
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
