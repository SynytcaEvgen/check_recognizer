import { RotatingLines } from 'react-loader-spinner'
import './spinner.css'
export function Spinner() {
  return (
	<div className="spinner">
	  <RotatingLines
  		visible={true}
  		height="96"
  		width="96"
		color="gray"
		strokeColor="gray"
  		strokeWidth="4"
  		animationDuration="0.85"
  		ariaLabel="rotating-lines-loading"
  		wrapperStyle={{}}
  		wrapperClass=""
  		/>
	</div>
  )
}