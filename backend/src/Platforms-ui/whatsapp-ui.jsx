import { ArrowLeft, Video, Phone, EllipsisVertical, Sticker, Link, BadgeIndianRupee, Camera, Mic } from "lucide-react"
import { MdOutlineVideocam, MdOutlineCall, MdAttachFile, MdOutlineCameraAlt } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";

import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMdMic } from "react-icons/io";
import { PiSticker } from "react-icons/pi";
export default function WhatsApp({ receiver, receiverAvatar, messages, bgImg, isHeaderFooterRendered }) {

  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col mb-2 shadow-2xl border rounded-none">
        {/* Header */}
        {isHeaderFooterRendered && (
          <div className="flex justify-between items-center bg-white dark:bg-black border-b border-gray-300 py-1 gap-x-2 px-2 dark:text-white dark:border-gray-700">
            <IoArrowBackSharp size={17} />
            <div className="flex-1 flex my-1 items-center">
              <div className="w-7 aspect-square rounded-full mr-2 text-center text-xs">
                {receiverAvatar ? (
                  <img
                    src={receiverAvatar}
                    alt="Receiver Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
                  >
                    <span className="text-gray-500 dark:text-gray-300">
                      {receiver ? receiver.charAt(0).toUpperCase() : 'R'}
                    </span>
                  </div>
                )}
              </div>
              <span>{receiver}</span>
            </div>
            <div className="flex gap-x-6">
              <MdOutlineVideocam size={20} />
              <MdOutlineCall size={17} />
              <FaEllipsisVertical size={18} />
            </div>
          </div>
        )}
        {/* Chat area */}
        <div
          className="flex flex-col flex-1 min-h-0"
          style={{
            backgroundImage: bgImg ? `url(${bgImg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: "624px"
          }}
        >
          <ul className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-gutter-stable px-1">
            {messages.map((msg, index) => {
              // Check if previous message has the same sender
              const isSameSender = index > 0 && messages[index - 1].sender === msg.sender;
              const gapClass = isSameSender ? 'mt-1' : 'mt-3';

              return msg.sender === 'sender' ? (
                <li key={index} className={`${gapClass} flex justify-end items-center`}>
                  <div className={`relative inline-block py-1 px-2 mr-2.5 bg-[#d9fdd3] dark:bg-[#144d37] max-w-[60%] rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px] ${isSameSender ? 'rounded-tr-[10px]' : 'rounded-tr-none'}`}>
                    <div
                      className="absolute w-3 h-5 bg-[#d9fdd3] dark:bg-[#144d37]"
                      style={{
                        display: !isSameSender ? 'block' : 'none',
                        right: !isSameSender ? '-6px' : 'none',
                        top: '0',
                        clipPath: !isSameSender ? 'polygon(0% 0%, 100% 0%, 0% 100%)' : '0',
                        borderRadius: '4px',
                      }}
                    />
                    <p className="whitespace-pre-wrap text-[12px] dark:text-white after:content-[''] after:inline-block after:w-[50px] after:h-0">
                      {msg.message}
                    </p>
                    <span className="flex items-center justify-end gap-1 text-[10px] text-gray-600 dark:text-gray-300 -mt-2.5">
                      <span>{msg.time}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 500"
                        className="w-[12px] h-[12px] shrink-0"
                        height={12}
                        width={12}
                      >
                        <path
                          d="M 0.00 240.00 L 0.00 258.00 C 10.01 272.84 25.43 287.47 38.75 301.25 C 52.07 315.02 65.83 329.67 78.75 342.25 C 91.68 354.83 106.57 379.69 126.93 375.93 C 147.28 372.16 156.05 351.92 171.25 339.25 C 186.45 326.57 199.58 310.02 212.70 298.70 C 225.82 287.38 238.74 271.22 253.25 258.25 C 267.76 245.28 278.85 230.36 293.75 217.75 C 308.65 205.14 319.51 190.24 335.25 177.25 C 350.99 164.26 360.29 138.53 338.23 126.77 C 316.17 115.01 300.83 138.31 286.75 151.75 C 272.68 165.19 259.97 179.35 246.25 192.25 C 232.52 205.15 218.57 218.54 204.75 232.75 C 190.93 246.96 176.61 260.33 163.90 272.90 C 151.20 285.47 137.72 299.31 123.00 313.00 C 109.99 298.64 98.10 287.90 85.25 273.75 C 72.39 259.60 59.89 249.85 47.25 234.75 C 34.60 219.66 6.63 218.29 0.00 240.00 Z"
                          fill="#4690B5"
                          fillOpacity="0.96"
                        />
                        <path
                          d="M 500.00 160.00 L 500.00 142.00 C 490.30 115.52 460.42 125.46 446.75 141.75 C 433.08 158.04 417.92 169.62 403.75 184.75 C 389.58 199.89 374.75 213.76 360.25 228.25 C 345.75 242.73 331.77 256.05 316.75 270.75 C 301.74 285.46 288.80 300.17 273.00 313.00 C 262.29 295.14 231.49 293.53 224.78 316.78 C 218.06 340.03 238.11 347.85 251.75 365.25 C 265.38 382.65 289.80 374.66 302.25 358.25 C 314.69 341.84 329.26 334.41 342.25 319.25 C 355.24 304.08 368.84 293.74 382.25 279.25 C 395.65 264.76 409.85 252.82 422.10 240.10 C 434.34 227.38 449.08 214.28 461.75 200.75 C 474.42 187.23 489.95 175.00 500.00 160.00 Z"
                          fill="#4690B5"
                          fillOpacity="0.96"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              ) : (
                <li key={index} className={`${gapClass} flex justify-start items-center`}>
                  <div className={`relative inline-block px-2 py-1 ml-2.5 bg-white dark:bg-[#20272b] max-w-[60%] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] ${isSameSender ? 'rounded-tl-[10px]' : 'rounded-tl-none'}`}>
                    <div
                      className="absolute w-3 h-5 bg-white dark:bg-[#20272b]"
                      style={{
                        display: !isSameSender ? 'block' : 'none',
                        left: !isSameSender ? '-6px' : 'none',
                        top: '0',
                        clipPath: !isSameSender ? 'polygon(0% 0%, 100% 0%, 100% 100%)' : 0,
                        borderRadius: '4px',
                      }}
                    />
                    <p className="whitespace-pre-wrap text-[12px] dark:text-white after:content-[''] after:inline-block after:w-[50px] after:h-0">
                      {msg.message}
                    </p>
                    <span className="text-xs text-gray-600 dark:text-gray-300 block text-right -mt-2.5 text-[10px]">
                      {msg.time}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Input bar */}
          {isHeaderFooterRendered && (
            <div className="w-full flex gap-x-1 mt-1.5 h-[40px] bg-transparent">
              <div className="flex items-center gap-2 px-3 py-1 ml-1 mb-1.5 rounded-3xl bg-white dark:bg-[#20272b] w-full h-10">
                <PiSticker className="shrink-0 text-gray-400 dark:text-gray-400" size={20} />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Messages</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <MdAttachFile size={18} className="dark:text-gray-400" />
                  <RiMoneyRupeeCircleLine size={18} className="dark:text-gray-400" />
                  <MdOutlineCameraAlt size={18} className="dark:text-gray-400" />
                </div>
              </div>
              <div className="flex justify-center items-center aspect-square rounded-full bg-green-400 h-10 w-10 mr-1" >
                <IoMdMic size={16} className=" text-white dark:text-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}