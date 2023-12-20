import { Skeleton } from "@mui/material";
const ProductDetailsSkeleton = () => {
  const itemList = () => {
    const list = new Array(5).fill(0);
    return (
      <>
        {list.map((idx,i) => {
          return (
            <div className="flex gap-5" key={i}>
              <Skeleton
                variant="rounded"
                width={350}
                height={30}
                animation="pulse"
              />
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div
        className={`flex flex-col lg:flex-row justify-center items-center my-28 gap-16`}
      >
        <Skeleton
          variant="rectangular"
          width={500}
          height={500}
          animation="pulse"
        />
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-col gap-4">
            <Skeleton
              variant="text"
              sx={{ fontSize: "4rem" }}
              animation="pulse"
            />

            <Skeleton
              variant="rounded"
              width={500}
              height={150}
              animation="pulse"
            />

            <Skeleton
              variant="rounded"
              width={200}
              height={50}
              animation="pulse"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row my-32 gap-20">
        <div className="flex-1">
          <Skeleton
            variant="text"
            sx={{ fontSize: "4rem" }}
            animation="pulse"
          />
          <Skeleton
            variant="rounded"
            width={300}
            height={200}
            animation="pulse"
          />
        </div>
        <div className="flex-1 p-6 flex justify-center">
          <div>
            <Skeleton
              variant="text"
              sx={{ fontSize: "4rem" }}
              animation="pulse"
            />
            <div>{itemList()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
