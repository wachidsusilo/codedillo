import FooterList from './FooterList'

const list = [
    "List 1",
    "List 2",
    "List 3",
    "List 4",
    "List 5",
    "List 7",
    "List 8",
]

const Footer = () => {
    return (
        <footer className="w-full pt-16 pb-32 border-t border-white/10">
            <div className="w-full max-w-container mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-8 md:gap-x-8 md:gap-y-0">
                <div className=" col-[span_2] md:col-[1]">
                    <img
                        className="w-6 h-6"
                        src="/assets/images/app_icon.png"
                        alt=""/>
                </div>
                <FooterList
                    title="Title"
                    list={list} />
                <FooterList
                    title="Title"
                    list={list} />
                <FooterList
                    title="Title"
                    list={list} />
                <FooterList
                    title="Title"
                    list={list} />
            </div>
        </footer>
    )
}

export default Footer