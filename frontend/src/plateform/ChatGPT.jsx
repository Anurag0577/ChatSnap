import { FiCopy, FiThumbsUp, FiThumbsDown, FiVolume2, FiMoreVertical, FiEdit, FiPlus, FiMic } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";

function MenuIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function WaveIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8" y1="6" x2="8" y2="18" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  );
}

export default function ChatGPT({ messages, isHeaderFooterRendered }) {
  return (
    <>
      <div
        className="chatbox-preview flex-1 min-h-0 flex flex-col mb-2 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-none bg-[#fafafa] dark:bg-black text-black dark:text-white"
        id="renderedUI-driver"
      >
        {isHeaderFooterRendered && (
          <div className="flex justify-between items-center bg-[#fafafa] dark:bg-black px-2.5 pt-2.5 pb-1.5">
            <div className="flex items-center justify-center w-[31px] h-[31px] rounded-full bg-white dark:bg-[#2b2b2b] border border-transparent dark:border-[#3a3a3a] shadow-[0_1px_6px_rgba(0,0,0,0.06)] dark:shadow-none text-black dark:text-white">
              <MenuIcon size={16} />
            </div>
            <div className="flex items-center gap-x-4 h-[31px] px-3 rounded-full bg-white dark:bg-[#2b2b2b] border border-transparent dark:border-[#3a3a3a] shadow-[0_1px_6px_rgba(0,0,0,0.06)] dark:shadow-none text-black dark:text-white">
              <FiEdit size={15} />
              <FiMoreVertical size={15} />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 min-h-0 bg-[#fafafa] dark:bg-black">
          <ul className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-gutter-stable px-2.5 pt-3">
            {(messages || []).map((msg, index) => {
              const gapClass = index === 0 ? '' : 'mt-6';

              return msg.sender === 'sender' ? (
                <li key={index} className={`${gapClass} flex justify-end`}>
                  <div className="inline-block max-w-[73%] px-[11px] py-[9px] rounded-[18px] bg-[#ebf1ff] dark:bg-[#04045e]">
                    <p className="whitespace-pre-wrap text-[13px] leading-[16px] text-black dark:text-white">
                      {msg.message}
                    </p>
                  </div>
                </li>
              ) : (
                <li key={index} className={`${gapClass} flex flex-col items-start`}>
                  <p className="whitespace-pre-wrap text-[13px] leading-[16px] text-black dark:text-white">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-x-[14px] mt-[22px] text-[#5d5d5d] dark:text-gray-400">
                    <FiCopy size={14} />
                    <FiThumbsUp size={14} />
                    <FiThumbsDown size={14} />
                    <FiVolume2 size={14} />
                    <IoShareSocialOutline size={14} />
                    <FiMoreVertical size={14} />
                  </div>
                </li>
              );
            })}
          </ul>

          {isHeaderFooterRendered && (
            <div className="w-full flex items-center gap-x-1.5 px-2.5 pt-1.5 pb-2.5 bg-[#fafafa] dark:bg-black">
              <div className="flex items-center gap-2 px-3 h-[40px] rounded-full bg-white dark:bg-[#262626] border border-transparent dark:border-[#3a3a3a] shadow-[0_1px_8px_rgba(0,0,0,0.06)] dark:shadow-none flex-1">
                <FiPlus className="shrink-0 text-black dark:text-white" size={18} />
                <div className="flex-1">
                  <p className="text-[#8a8a8a] dark:text-[#9a9a9a] text-[13px]">Reply to ChatGPT</p>
                </div>
                <FiMic className="shrink-0 text-black dark:text-white" size={16} />
                <div className="flex justify-center items-center shrink-0 rounded-full bg-[#2f5bf2] h-[28px] w-[28px] text-white">
                  <WaveIcon size={15} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}