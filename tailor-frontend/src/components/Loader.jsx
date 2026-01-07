import React from 'react';

const Loader = ({ show }) => {
  if (!show) return null;

  return (
    <>
      <style>
        {`
          .loader-wrapper {
            position: fixed;
            inset: 0;
            background-color: #FDFBF7;
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .tailor-machine {
            position: relative;
            width: 120px;
            height: 100px;
          }

          .machine-body {
            position: absolute;
            top: 20px;
            right: 0;
            width: 100px;
            height: 15px;
            background: #2D2D2D;
            border-radius: 4px 10px 0 0;
          }

          .machine-pillar {
            position: absolute;
            top: 20px;
            right: 0;
            width: 25px;
            height: 60px;
            background: #2D2D2D;
          }

          .machine-base {
            position: absolute;
            bottom: 10px;
            width: 120px;
            height: 6px;
            background: #2D2D2D;
            border-radius: 2px;
          }

          .machine-wheel {
            position: absolute;
            right: -8px;
            top: 25px;
            width: 10px;
            height: 30px;
            background: #C5A059;
            border-radius: 4px;
          }

          .needle-bar {
            position: absolute;
            top: 35px;
            left: 15px;
            width: 4px;
            height: 30px;
            background: #A0A0A0;
            animation: stitch 0.6s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
          }

          .needle-bar::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 1.5px;
            width: 1px;
            height: 12px;
            background: #2D2D2D;
          }

          .thread {
            position: absolute;
            top: 25px;
            left: 17px;
            width: 1px;
            height: 30px;
            background: #C5A059;
            transform-origin: top;
            animation: thread-stretch 0.6s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
            opacity: 0.6;
          }

          @keyframes stitch {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(22px); }
          }

          @keyframes thread-stretch {
            0%,100% { transform: scaleY(1) skewX(0deg); }
            50% { transform: scaleY(1.6) skewX(-2deg); }
          }

          .machine-shadow {
            position: absolute;
            bottom: 2px;
            left: 10px;
            width: 100px;
            height: 4px;
            background: rgba(0,0,0,0.05);
            border-radius: 50%;
            filter: blur(2px);
          }
        `}
      </style>

      <div className="loader-wrapper">
        <div className="tailor-machine">
          <div className="machine-shadow"></div>
          <div className="machine-base"></div>
          <div className="machine-pillar"></div>
          <div className="machine-body"></div>
          <div className="machine-wheel"></div>
          <div className="thread"></div>
          <div className="needle-bar"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
