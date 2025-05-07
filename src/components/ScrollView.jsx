const ScrollView = ({
  children
}) => {
  
  return (
    <div className=" bg-white overflow-y-visible h-full ">
      {children}
    </div>
  );
};

export default ScrollView;
