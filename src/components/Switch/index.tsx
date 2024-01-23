const Switch = ({
    value,
    onClick,
}: {
    value: boolean,
    onClick: () => void,
}) => {
    return (
        <div
            onClick={onClick}
            className={`${value ? 'bg-green-400' : 'bg-gray-300'} w-12 h-7 rounded-3xl relative transition-all flex`}
        >
            <div
                className={`bg-white rounded-full w-6 h-6 mt-[2px] absolute`}
                style={{
                    left: value ? `calc(100% - 26px)` : 'calc(2px)',
                    transition: '150ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
            </div>
            {/* <div className={`absolute`}>
          {`${value}`}
        </div> */}
        </div>
    )
}

export default Switch