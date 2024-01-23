import { GiHeavyRain } from 'react-icons/gi'
import Switch from '../Switch'
import { useState } from 'react'

const ControlCard = () => {
  const [isActive, setIsActive] = useState(false)
  const handleOnClick = () => {
    setIsActive(prev => !prev)
  }

  return (
    <div className={`rounded-lg bg-white px-4 py-6 min-w-32 w-max`}>
      <div className={`text-2xl flex justify-center`}>
        <GiHeavyRain />
      </div>
      <div className={`text-center mt-4`}>
        Spray water
      </div>
      <div className={`flex justify-center mt-4`}>
        <Switch
          value={isActive}
          onClick={handleOnClick}
        />
      </div>
    </div>
  )
}

export default ControlCard