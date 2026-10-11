import { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPhone, LuVideo } from "react-icons/lu";
import { RiFlag2Line } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { HiOutlinePhoto } from "react-icons/hi2";
import { PiStickerBold } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";

// useLayoutEffect warns during server rendering, so fall back to useEffect there
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Vertical gradient, same stops as the article (purple at the top -> blue at the bottom)
const SENDER_GRADIENT = 'linear-gradient(to bottom, #b117db 0%, #614afa 100%)';

// Same logic as updateGradients() below, as plain JS so it also works in server-rendered HTML.
const GRADIENT_SCRIPT = `(function(){
  var s=document.currentScript; var c=s&&s.previousElementSibling; if(!c) return;
  function u(){
    var r=c.getBoundingClientRect();
    c.querySelectorAll('[data-gradient-bubble]').forEach(function(b){
      var t=b.getBoundingClientRect().top-r.top;
      b.style.backgroundSize='100% '+r.height+'px';
      b.style.backgroundPosition='0px '+(-t)+'px';
    });
  }
  u();
  c.addEventListener('scroll',u);
  window.addEventListener('resize',u);
  window.addEventListener('load',u);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(u);
  if(window.ResizeObserver){
    var o=new ResizeObserver(u); o.observe(c);
    if(c.firstElementChild) o.observe(c.firstElementChild);
  }
})();`;

export default function InstagramExtra({ receiver, receiverAvatar, messages }) {
    const scrollRef = useRef(null);

    // Instagram-style "screen-fixed" gradient for sender bubbles.
    // Every bubble gets a background as tall as the visible chat area, shifted up by the
    // bubble's offset inside that area, so all bubbles sample ONE shared gradient
    // (top of chat = purple, bottom of chat = blue) instead of each having its own.
    // This replaces `background-attachment: fixed`, which pins to the browser window and
    // behaves inconsistently in Puppeteer element screenshots.
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

    // Recalculate when messages change, and whenever the chat area or the list changes
    // size (fonts loading, images loading, window resize, etc.)
    useIsoLayoutEffect(() => {
        updateGradients();

        const container = scrollRef.current;
        if (!container) return;

        const observer = new ResizeObserver(updateGradients);
        observer.observe(container);
        if (container.firstElementChild) observer.observe(container.firstElementChild);

        // Fonts can finish loading after first paint and shift the layout
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(updateGradients);
        }

        return () => observer.disconnect();
    }, [messages, updateGradients]);

    return (
        <>
            <div className="instagram-container flex-1 min-h-0 flex flex-col mb-2 shadow-2xl border rounded-none bg-white dark:bg-black text-black dark:text-white">

                {/* Header */}
                <div className="instagram-header flex items-center h-fit p-2 bg-white dark:bg-black text-black dark:text-white">
                    <IoArrowBackOutline size={20} />

                    {/* Receiver Info */}
                    <div className="flex-1 ml-7 flex content-center gap-3">
                        <img className="h-8 w-8 rounded-full" src={receiverAvatar} alt="avatar" />
                        <div className="flex flex-col justify-center">
                            <div className="bold text-[14px] leading-tight">{receiver}</div>
                            <div className="lighter text-[10px] -mt-2">Eren0eth</div>
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
                            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-gutter-stable px-2 py-3"
                            style={{ minHeight: "624px" }}
                        >

                            <ul>
                                {messages.map((msg, index) => {
                                    const isPreviousSenderSame =
                                        index > 0 && messages[index - 1].sender === msg.sender;

                                    const isNextSenderSame =
                                        index < messages.length - 1 && messages[index + 1].sender === msg.sender;

                                    const roundTop = !isPreviousSenderSame;
                                    const roundBottom = !isNextSenderSame;

                                    const showAvatar =
                                        msg.sender !== "sender" && !isNextSenderSame;

                                    // Dynamic Styles Objects
                                    // Use marginTop instead of borderTopWidth so spacing is an actual margin
                                    const liStyle = {
                                        marginTop: isPreviousSenderSame ? '2px' : '12px',
                                    };

                                    // Longhand background props (not the `background` shorthand) so the
                                    // size/position set by updateGradients() are never reset by React.
                                    const senderBubbleStyle = {
                                        backgroundImage: SENDER_GRADIENT,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundColor: '#614afa', // fallback until gradient is positioned
                                        borderTopRightRadius: roundTop ? '10px' : '0px',
                                        borderBottomRightRadius: roundBottom ? '10px' : '0px'
                                    };

                                    const receiverBubbleStyle = {
                                        borderTopLeftRadius: roundTop ? '10px' : '0px',
                                        borderBottomLeftRadius: roundBottom ? '10px' : '0px'
                                    };

                                    return msg.sender === "sender" ? (
                                        // ------------------- SENDER -------------------
                                        <li key={index} className="flex justify-end" style={liStyle}>
                                            <div
                                                data-gradient-bubble
                                                style={senderBubbleStyle}
                                                className="relative inline-block py-1 px-2 max-w-[60%] max-h-[200px] overflow-y-auto rounded-tl-[10px] rounded-bl-[10px] "
                                            >
                                                <p className="whitespace-pre-wrap text-[12px] text-white dark:text-white">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </li>
                                    ) : (
                                        // ------------------- RECEIVER -------------------
                                        <li key={index} className="flex items-end gap-1" style={liStyle}>

                                            {showAvatar ? (
                                                <img
                                                    src={receiverAvatar}
                                                    className="h-4 w-4 rounded-full mb-1 ml-1"
                                                    alt="avatar"
                                                />
                                            ) : (
                                                <div className="w-4 ml-1" />
                                            )}

                                            <div
                                                style={receiverBubbleStyle}
                                                className="relative inline-block px-2 py-1 bg-[#eeefef] dark:bg-[#262726] max-w-[60%] max-h-[200px] overflow-y-auto rounded-tr-[10px] rounded-br-[10px]"
                                            >
                                                <p className="whitespace-pre-wrap text-[12px] dark:text-white">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Static-HTML fallback: if this component is rendered with renderToString()
                            (no React effects), this inline script positions the gradient when the
                            page loads in Puppeteer. In a live React tree the effect above does it and
                            this tag is inert. It must stay directly AFTER the scroll container. */}
                        <script dangerouslySetInnerHTML={{ __html: GRADIENT_SCRIPT }} />

                        {/* Input Bar */}
                        <div className="instagram-input w-full flex gap-x-1 mt-1.5 h-fit bg-transparent p-2">
                            <div className="flex items-center justify-between w-full gap-4 p-2 bg-gray-100 dark:bg-[#262726] rounded-full">

                                <div className="p-2 rounded-full bg-pink-600">
                                    <FaCamera color="#fff" size={14} className="dark:text-gray-400" />
                                </div>

                                <div className="text-sm">Messages...</div>

                                <div className="flex-1 flex justify-end items-center gap-4">
                                    <FiMic size={18} className="dark:text-gray-400" />
                                    <HiOutlinePhoto size={20} className="dark:text-gray-400" />
                                    <PiStickerBold size={20} className="dark:text-gray-400" />
                                    <IoMdAddCircleOutline size={20} className="dark:text-gray-400" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}