import { useSelector } from "react-redux";


export default function Home () {
    const { user: currentUser } = useSelector((state) => state.auth)
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height: "700px"}}>
                <h1>WELCOME {currentUser ? currentUser.userName.toUpperCase() : ""}!</h1>
            </div>
        </>
    )
}