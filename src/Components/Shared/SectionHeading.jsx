
const SectionHeading = ({heading, subHeading}) => {
    return (
        <div className="my-10 flex flex-col justify-center items-center space-y-4">
            <p className="text-[#D99904] w-fit border-b-2 border-slate-300 px-4 py-2">{subHeading} </p>
            <h1 className="text-2xl px-2 py-2 w-fit font-semibold border-b-2 border-slate-300">{heading} </h1>
        </div>
    );
};

export default SectionHeading;