import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { PiSticker } from "react-icons/pi";
import { FaVideo } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { TbCards } from "react-icons/tb";
import { BiJoystick } from "react-icons/bi";

const COLOR_THEM = "rgb(0,195,255)";
const COLOR_ME = "rgb(255,48,54)";

export default function Snapchat({ receiver, receiverAvatar, messages, isHeaderFooterRendered }) {

    // Merge consecutive messages from the same sender into a single group so
    // they render under one name header and share one unbroken border,
    // instead of each message getting its own separate bordered block.
    const groupedMessages = [];
    messages.forEach((msg) => {
        const lastGroup = groupedMessages[groupedMessages.length - 1];
        if (lastGroup && lastGroup.sender === msg.sender) {
            lastGroup.items.push(msg);
        } else {
            groupedMessages.push({ sender: msg.sender, items: [msg] });
        }
    });

    return (
        <>
            <div className="chatbox-preview flex-1 min-h-0 flex flex-col mb-2 shadow-2xl border rounded-none" id="renderedUI-driver">

                {isHeaderFooterRendered && (
                    <div
                        className="relative flex items-center justify-between py-2 px-3 gap-x-2 bg-white dark:bg-black border-b-[0.3px] border-black/30 dark:border-white/30  "
                        
                    >
                        <div className="flex items-center gap-x-3">
                            <IoIosArrowBack size={22} className="text-black dark:text-white" />
                        </div>

                        <div className="flex-1 flex items-center justify-left gap-x-2 pointer-events-none select-none">
                            {receiverAvatar ? (
                                <img
                                    src={receiverAvatar}
                                    alt="Receiver Avatar"
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            ) : (
                                <div
                                    aria-hidden="true"
                                    className="w-6 h-6 rounded-full flex items-center justify-center bg-white/30"
                                >
                                    <span className="text-black dark:text-white text-[10px]">
                                        {receiver ? receiver.charAt(0).toUpperCase() : "R"}
                                    </span>
                                </div>
                            )}
                            <span className="text-black dark:text-white text-sm font-medium">{receiver}</span>
                        </div>
                        <IoCall size={18} className="text-black dark:text-white" />
                        <FaVideo size={20} className="mx-3 text-black dark:text-white" />
                    </div>
                )}

                <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-[#0b0b0b]">
                    <ul className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-gutter-stable px-3 py-2">
                        {groupedMessages.map((group, gIndex) => {
                            const isMe = group.sender === "sender";
                            const from = isMe ? "Me" : (receiver || "Them");
                            const accent = isMe ? COLOR_ME : COLOR_THEM;

                            return (
                                <li key={gIndex} className="mt-3">
                                    <span
                                        className="block text-[11px] font-semibold uppercase tracking-wide mb-0.5"
                                        style={{ color: accent }}
                                    >
                                        {from}
                                    </span>

                                    {/* single continuous border for the whole group — no per-message break */}
                                    <div className="pl-2 py-0.5" style={{ borderLeft: `2px solid ${accent}` }}>
                                        {group.items.map((msg, mIndex) => (
                                            <p
                                                key={mIndex}
                                                className="whitespace-pre-wrap text-xs text-[#222] dark:text-white"
                                            >
                                                {msg.message}
                                            </p>
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {isHeaderFooterRendered && (
                        <div className="w-full flex items-center gap-x-2 px-2 py-1.5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b0b0b]">
                            <div className="h-fill aspect-square bg-black dark:bg-white p-1.5 rounded-2xl">
                                <FaCamera className="  text-white dark:text-black "/>
                            </div>
                            <div className="flex-1 flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#20272b]">
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Send chat</span>
                            </div>
                            <BsEmojiSmile size={20} className="p-0.5" />
                            <TbCards size={20}  />
                            <BiJoystick size={20} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
