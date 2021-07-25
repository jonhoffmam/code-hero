import Menu from '../Menu';

const PageDefault = (props: any) => {
  const {children} = props;
  
  return (
    <>
      <Menu/>
      {children}      
    </>
  );
}

export default PageDefault;
