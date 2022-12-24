
const LeftBar = () => {

    return (
        <div className="left-bar">
            <div className="title">
                <h1>Spotted</h1>
            </div>
            <div className="bar">
                <div className="menu">
                    <div className="element">
                        <div className="button">Główna</div>
                    </div>
                    <div className="element">
                        <div className="button">Powiadomienia</div>
                    </div>
                    <div className="element">
                        <div className="button">Wiadomości</div>
                    </div>
                    <div className="element">
                        <div className="button">Zapisane</div>
                    </div>
                    <div className="element">
                        <div className="button">Profil</div>
                    </div>
                    <div className="tweet">
                        <div className="button">Wstaw</div>
                    </div>
                </div>
                <div className="profile">
                    <div className="avatar"></div>
                    <div className="nickname">thekuba</div>
                    <div className="menuicon"></div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;