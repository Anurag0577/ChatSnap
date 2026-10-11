import { useRef, useLayoutEffect, useCallback } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPhone, LuVideo } from "react-icons/lu";
import { RiFlag2Line } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { HiOutlinePhoto } from "react-icons/hi2";
import { PiStickerBold } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import InstagramAvatar from '../assets/instagramAvatar.jpeg'

const SENDER_GRADIENT = 'linear-gradient(to bottom, #c607cc, #5850f9)';

export default function Instagram({ receiver, receiverAvatar, messages }) {
    const scrollRef = useRef(null);

    // Instagram-style "screen-fixed" gradient for sender bubbles.
    // The article uses `background-attachment: fixed`, which pins the gradient to the
    // browser window. Here the chat lives inside a preview box, so we pin the gradient
    // to the scroll container instead: every bubble gets a background as tall as the
    // visible chat area, shifted up by the bubble's current offset inside that area.
    const updateGradients = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const bubbles = container.querySelectorAll('[data-gradient-bubble]');

        bubbles.forEach((bubble) => {
            const offsetTop = bubble.getBoundingClientRect().top - containerRect.top;
            bubble.style.backgroundSize = `100% ${containerRect.height}px`;
            bubble.style.backgroundPosition = `0px ${-offsetTop}px`;
        });
    }, []);

    // Re-calculate when messages change and when the container is resized
    useLayoutEffect(() => {
        updateGradients();

        const container = scrollRef.current;
        if (!container) return;

        const observer = new ResizeObserver(updateGradients);
        observer.observe(container);

        return () => observer.disconnect();
    }, [messages, updateGradients]);

    return (
        <>
            <div className=" chatbox-preview instagram-container flex-1 min-h-0 flex flex-col mb-2 shadow-2xl border rounded-none bg-white dark:bg-black" id="renderedUI-driver"  >

                {/* Header */}
                <div className="instagram-header flex items-center h-fit p-2">
                    <IoArrowBackOutline size={20} />

                    {/* Receiver Info */}
                    <div className="flex-1 ml-7 flex content-center gap-3">
                        <img className="h-8 w-8 rounded-full" src={(receiverAvatar === null) ? InstagramAvatar : receiverAvatar} />
                        <div className="flex flex-col justify-center">
                            <div className="bold text-sm leading-tight">{receiver}</div>
                        </div>
                    </div>

                    {/* Call Icons */}
                    <div className="flex gap-4 items-center">
                        <LuPhone size={16} />
                        <LuVideo size={20} />
                        <RiFlag2Line size={20} />
                    </div>
                </div>

                {/* Chat Body */}
                <div className="instagram-chat flex-1 min-h-0">
                    <div className="flex flex-col h-full min-h-0 justify-end">

                        {/* Scrollable messages section */}
                        <div
                            ref={scrollRef}
                            onScroll={updateGradients}
                            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-gutter-stable px-2 py-3 min-h-[624px] md:min-h-0"
                        >

                            <ul>
                                {messages.map((msg, index) => {
                                    const isPreviousSenderSame =
                                        index > 0 && messages[index - 1].sender === msg.sender;

                                    const isNextSenderSame =
                                        index < messages.length - 1 && messages[index + 1].sender === msg.sender;

                                    const gapClass = isPreviousSenderSame
                                        ? "mt-[2px]"
                                        : "mt-[12px]";

                                    const roundTop = !isPreviousSenderSame;
                                    const roundBottom = !isNextSenderSame;

                                    const showAvatar =
                                        msg.sender !== "sender" && !isNextSenderSame;

                                    return msg.sender === "sender" ? (

                                        <li key={index} className={`${gapClass} flex justify-end`}>
                                            <div
                                                data-gradient-bubble
                                                className={`relative inline-block py-2 px-2 max-w-[60%] rounded-tl-[15px] rounded-bl-[15px]
                                                    ${roundTop ? "rounded-tr-[15px]" : "rounded-tr-none"}
                                                    ${roundBottom ? "rounded-br-[15px]" : "rounded-br-none"}`}

                                                style={{
                                                    backgroundImage: SENDER_GRADIENT,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundColor: '#614afa',
                                                }}
                                            >
                                                <p className="whitespace-pre-wrap text-xs text-white">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={index} className={`${gapClass} flex items-end gap-1`}>

                                            {showAvatar ? (
                                                <img
                                                    src={(receiverAvatar === null) ? InstagramAvatar : receiverAvatar}
                                                    className="h-5 w-5 rounded-full mb-1 ml-1"
                                                />
                                            ) : (
                                                <div className="w-5 ml-1" />
                                            )}

                                            <div
                                                className={`relative inline-block px-3 py-2
                                                    bg-[#eeefef] dark:bg-[#262726]
                                                    max-w-[60%] rounded-tr-[15px] rounded-br-[15px]
                                                    ${roundTop ? "rounded-tl-[15px]" : "rounded-tl-none"}
                                                    ${roundBottom ? "rounded-bl-[15px]" : "rounded-bl-none"}`}
                                            >
                                                <p className="whitespace-pre-wrap text-xs dark:text-white">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>

                        <div className="instagram-input w-full flex gap-x-1 mt-1.5 h-fit bg-transparent p-2">
                            <div className="flex items-center justify-between w-full gap-4 p-2 bg-gray-100 dark:bg-[#262726] rounded-full">

                                <div className="p-2 rounded-full bg-pink-600">
                                    <FaCamera color="#fff" size={14} className="text-white" />
                                </div>

                                <div className="text-sm">Messages...</div>

                                <div className="flex-1 flex justify-end items-center gap-4">
                                    <FiMic size={18} />
                                    <HiOutlinePhoto size={20} />
                                    <PiStickerBold size={20} />
                                    <IoMdAddCircleOutline size={20} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}