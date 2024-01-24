import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { FaAngleRight } from "react-icons/fa6";

const BreadcrumbComponent = () => {


  return (
    <Breadcrumbs separator={<FaAngleRight size="10" />} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Landing
      </Link>
      <Link underline="hover" color="inherit" href="/home">
        Home
      </Link>
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;