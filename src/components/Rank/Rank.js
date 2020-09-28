import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className=' center white f3'>
				{`${name}, your current rank is...`}
			</div>
			<div className='center white f2'>
				{entries}
			</div>
		</div>
	);
}
export default Rank;