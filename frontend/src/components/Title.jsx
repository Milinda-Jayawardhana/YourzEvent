import PropTypes from 'prop-types'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex items-center gap-3 mb-3'>
        <p className='theme-subheading text-xs sm:text-sm'>{text1}<span className='theme-heading ml-2 text-lg sm:text-xl'>{text2}</span></p>
        <p className='h-[1px] w-10 bg-[#ad7a5f] sm:h-[2px] sm:w-16'></p>
    </div>
  )
}

export default Title

Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired
}
