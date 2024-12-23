import * as React from 'react';
import { Link } from 'react-router-dom';
import { IoFingerPrintOutline } from "react-icons/io5";

export default function LandingPage() {
    return (
      <div className="h-screen w-full relative">
    
        <div className="h-screen w-full flex justify-center items-center">
          <Link to="/registration">
            
          </Link>
          <div className="h-screen w-full flex justify-center items-center">
          <Link to="/registration">
            <IoFingerPrintOutline 
              className="text-9xl text-white/50 hover:text-white absolute z-10"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} 
            />
          </Link>
          
          <iframe 
            src='https://my.spline.design/animatedshapeblend-521b7666150587eac6e2ab105024816c/' 
            frameBorder='0' 
            width='100%' 
            height='100%' 
            className='z-0'
            data-testid="splineBackground"
          ></iframe>
        </div>
         
        </div>
      </div>
    );
}
