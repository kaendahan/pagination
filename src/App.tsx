import { useState } from "react";
import { PaginationSimple, Pagination } from "./lib";
import Select from "./Select";

function App() {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(500);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [variant, setVariant] = useState<
    "ghost" | "bordered" | "bordered-group"
  >("bordered");
  const [shape, setShape] = useState<
    "circle" | "rounded" | "rounded-md" | "rounded-lg" | "square"
  >("rounded");

  const handleChangePage = (page: number) => {
    setCurrent(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center gap-4 border">
        <div>
          Size :{" "}
          <Select
            options={[
              { value: "sm", text: "small" },
              { value: "md", text: "medium" },
              { value: "lg", text: "large" },
            ]}
            value={size}
            onChange={setSize}
          />
        </div>
        <div>
          Variant :{" "}
          <Select
            options={[
              {
                value: "ghost",
                text: "ghost",
              },
              {
                value: "bordered",
                text: "bordered",
              },
              {
                value: "bordered-group",
                text: "bordered-group",
              },
            ]}
            value={variant}
            onChange={setVariant}
          />
        </div>
        <div>
          Shape :{" "}
          <Select
            options={[
              {
                value: "circle",
                text: "circle",
              },
              {
                value: "rounded",
                text: "rounded",
              },
              {
                value: "rounded-md",
                text: "rounded-md",
              },
              {
                value: "rounded-lg",
                text: "rounded-lg",
              },
              {
                value: "square",
                text: "square",
              },
            ]}
            value={shape}
            onChange={setShape}
          />
        </div>
        <div>
          Per page :{" "}
          <Select
            options={[
              {
                value: "10",
                text: "10",
              },
              {
                value: "15",
                text: "15",
              },
              {
                value: "25",
                text: "25",
              },
              {
                value: "50",
                text: "50",
              },
              {
                value: "100",
                text: "100",
              },
            ]}
            value={String(perPage)}
            onChange={(perPage) => {
              setCurrent(1);
              setPerPage(perPage);
            }}
          />
        </div>
      </div>

      <div className="flex-col items-center justify-center gap-4 border">
        <div className="flex items-center justify-center p-3">
          <Pagination
            current={current}
            pageSize={perPage}
            total={total}
            onChangePage={handleChangePage}
            size={size}
            variant={variant}
            shape={shape}
          />
        </div>

        <div className="flex items-center justify-center p-3  ">
          <PaginationSimple
            current={current}
            pageSize={perPage}
            total={total}
            onChangePage={handleChangePage}
            size={size}
            variant={variant}
            shape={shape}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
