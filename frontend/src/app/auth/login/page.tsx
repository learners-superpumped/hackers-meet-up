export default function LoginPage() {
    return <div className="flex flex-col w-full h-screen justify-center content-center">
        <div className="text-center">
            <div className="flex-col justify-center items-center gap-10 inline-flex">
                <div className="text-center text-black text-6xl font-semibold">AGI Party</div>
                <input
                    placeholder="Enter your email"
                    type="email"
                    className="w-[40rem] px-4 py-6 rounded-2xl border-solid border-4 border-zinc-300 placeholder:text-center text-start text-black text-5xl font-normal placeholder:text-neutral-400">
                </input>
            </div>
        </div>
    </div>
}
