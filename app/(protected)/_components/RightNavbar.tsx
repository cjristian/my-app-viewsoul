export default function RightNavbar() {
    return (
        <div className="sticky right-0 top-0 z-0 h-screen w-[300px]
        xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 max-lg:hidden">
            <div className="flex flex-col gap-4">
                <h4>Siguiendo</h4>
                <div className="flex flex-col gap-4">maping users</div>
            </div>
            <div className="flex flex-col gap-4"> Personas que quizas conozcas </div>
        </div>
    )

}