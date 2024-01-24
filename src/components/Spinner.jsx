import CircularProgress from '@mui/material/CircularProgress';


const Spinner = ({text}) => {
  return (
    <div style={{ 
        display: 'flex', alignItems: 'center', gap: '5px',
        justifyContent:'center', flexDirection: 'column'
       }}>
      <CircularProgress />
      {text && <p>{text}</p>}
    </div>
  )
}

export default Spinner