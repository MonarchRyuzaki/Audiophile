import Skeleton from "@mui/material/Skeleton";

const ItemCardSkeleton = ({ idx }: { idx: number }) => {
  return (
    <div
      className={`flex flex-col ${
        idx % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } justify-center items-center my-28 gap-16`}
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
  );
};

export default ItemCardSkeleton;
