import { useEffect, useState } from 'react'
import { IoRefreshOutline } from "react-icons/io5";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';

import ControlCard from './components/ControlCard';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GiHeavyRain } from 'react-icons/gi'
import { BsStars } from "react-icons/bs";

import { FaTemperatureLow } from "react-icons/fa"
import { IoWater } from "react-icons/io5";
import TableHistory from './components/TableHistory';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqDOZwPNUnOl-r-J1p5fUIvcM7TRE2mKs",
  authDomain: "ma-farm-170a7.firebaseapp.com",
  databaseURL: "https://ma-farm-170a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ma-farm-170a7",
  storageBucket: "ma-farm-170a7.appspot.com",
  messagingSenderId: "1047542618698",
  appId: "1:1047542618698:web:f0bf748061f1c67495a4b3"
};

type RealData = {
  humidityCondition: number,
  isWater: boolean,
  relative_humidity: number,
  relayDust: boolean,
  relayStringer: boolean,
  springer: boolean,
  temperature: string,
  timestamp: string,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  // const [springerStatus, setSpringerStatus] = useState(false)
  const [isWaterStatus, setIsWaterStatus] = useState(false)
  // const [springer, setSpringer] = useState(false)
  const [isWater, setIsWater] = useState(false)
  const [humidity, setHumidity] = useState(0)
  const [temperature, setTemperature] = useState("0")

  useEffect(() => {
    const realData = ref(database, 'real');
    onValue(realData, (snapshot) => {
      const data:RealData = snapshot.val();
      console.log("ma data", data);
      // setSpringerStatus(data.relayStringer)
      setIsWaterStatus(data.relayDust)
      setHumidity(data.relative_humidity)
      setTemperature(data.temperature)
      // setSpringer(data.springer)
      setIsWater(data.isWater)
    });
  }, [])

  const handleOnChangeGreenHouse = () => {
    setIsWater(prev => !prev)
    set(ref(database, 'real/isWater'), !isWater)
  }

  return (
    <div className={`bg-[#F4F7FB] absolute inset-0`}>
      <div className={`m-4`}>
        <div className={`flex justify-between`}>
          <div className={`text-2xl font-bold`}>
            Hi baby!
          </div>
          <div className={`text-3xl`} onClick={() => window.location.reload()}>
            <IoRefreshOutline />
          </div>
        </div>
        <div className={`mt-4`}>
          <div className={`flex gap-2 items-center`}>
            <div>
              New style !
            </div>
            <div className={`text-yellow-400 text-lg`}>
              <BsStars />
            </div>
          </div>
          <ControlCard
            Icon={GiHeavyRain}
            className={`${isWaterStatus ? 'bg-white' : 'bg-blue-600 text-white'}`}
            label='Spray water'
            onClick={handleOnChangeGreenHouse}
            value={isWater}
          />
        </div>
        <div className={`mt-4 shadow bg-white w-full text-black text-opacity-80 p-4 rounded-lg`}>
          <div className={`flex justify-between items-center`}>
            <div className={`flex gap-2 items-center`}>
              <div>
                <IoWater />
              </div>
              <div>
                Humidity
              </div>
            </div>
            <div>
              {`${humidity}%`}
            </div>
          </div>
          <div className={`mt-2 relative bg-gradient-to-r from-red-500 via-green-500 via-[70%] to-blue-500 h-6 rounded-3xl flex justify-end`}>
            <div style={{left: `${humidity}%`}} className={`w-px h-8 bg-red-700 absolute -top-1`}></div>
          </div>
        </div>
        <div className={`mt-4 shadow bg-white w-full text-black text-opacity-80 p-4 rounded-lg`}>
          <div className={`flex justify-between items-center`}>
            <div className={`flex gap-2 items-center`}>
              <div>
                <FaTemperatureLow />
              </div>
              <div>
                Temperature
              </div>
            </div>
            <div>
              {`${temperature} C`}
            </div>
          </div>
          <div className={`mt-2 relative bg-gradient-to-r from-green-500 from-[27%] to-red-500 h-6 rounded-3xl flex justify-end`}>
            <div style={{left: `${temperature}%`}} className={`w-px h-8 bg-red-700 absolute -top-1`}></div>
          </div>
        </div>
        <div className={`mt-4`}>
          <TableHistory />
        </div>
      </div>
    </div>
  )
}

export default App