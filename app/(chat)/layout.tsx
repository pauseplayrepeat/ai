const ChatLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="mx-auto max-w-full h-full w-full">
            {children}
        </div>
    )
}

export default ChatLayout;

    