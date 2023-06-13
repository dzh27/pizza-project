import ContentLoader from "react-content-loader";

const pizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="286" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="443" rx="10" ry="10" width="95" height="30" />
    <rect x="121" y="431" rx="26" ry="26" width="152" height="46" />
    <circle cx="135" cy="145" r="125" />
  </ContentLoader>
);

export default pizzaSkeleton;
