import Instagram from "@/plateform/Instagram";
import Snapchat from "@/plateform/SnapChat";
import WhatsApp from "@/plateform/WhatsApp";
import ChatGPT from "@/plateform/ChatGPT";
import usePreviewData from "@/stores/usePreviewStore";

export default function RenderPlatformUI() {
  const sender = usePreviewData((s) => s.sender);
  const receiver = usePreviewData((s) => s.receiver);
  const receiverAvatar = usePreviewData((s) => s.receiverAvatar);
  const messages = usePreviewData((s) => s.messageArray);
  const platform = usePreviewData((s) => s.platform);
  const isHeaderFooterRendered = usePreviewData((s) => s.isHeaderFooterRendered);

  console.log('this is in the renderPlateform', platform)

  switch (platform?.toLowerCase()) {
    case "instagram":
      return <Instagram sender={sender} receiver={receiver} messages={messages} receiverAvatar={receiverAvatar}  isHeaderFooterRendered={isHeaderFooterRendered} />;
    case "whatsapp":
      return <WhatsApp sender={sender} receiver={receiver} messages={messages} receiverAvatar={receiverAvatar} isHeaderFooterRendered={isHeaderFooterRendered} />;
    case "snapchat":
      return <Snapchat receiver={receiver} messages={messages} receiverAvatar={receiverAvatar} isHeaderFooterRendered={isHeaderFooterRendered} />;
    case "chatgpt":
      return <ChatGPT messages={messages} isHeaderFooterRendered={isHeaderFooterRendered} />;
    default:
      return <WhatsApp sender={sender} receiver={receiver} messages={messages} receiverAvatar={receiverAvatar} isHeaderFooterRendered={isHeaderFooterRendered} />;
  }
}
