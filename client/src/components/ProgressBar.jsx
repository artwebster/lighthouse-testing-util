import "./ProgressBar.scss";

function ProgressBar({status}) {
    const { current, total } = status;
    const progressPercentage = Math.round(((current - 1) / total) * 100);

    return (
        <div className="cmp-progress__wrapper">
            <div className="cmp-progress__bar" style={{width: progressPercentage + "%"}}></div>
        </div>
    );
}

export default ProgressBar;
