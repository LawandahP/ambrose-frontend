/* eslint-disable react/prop-types */
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import BreadcrumbComponent from './Breadcrumb';


const Layout = ({children}) => {
  return (
    <>
        <CssBaseline />
        <Container sx={{ py: 8 }} maxWidth="md">
          <BreadcrumbComponent  />
            {children}
        </Container>
    </>
  )
}

export default Layout