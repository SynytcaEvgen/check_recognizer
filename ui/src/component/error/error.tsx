import './error.css'

export default function Error({ textError }: { textError: string }) { 
	return (
		<div className='error-block'>
			<p>{ textError }</p>
		</div>	
	)
}	