import { callbackify } from "util";

const Styles = {
    frameCard: {
        width: "auto",
        marginTop: "10px",
        marginBottom: "25px",
        marginLeft: "25px",
        marginRight: "25px"
    },
    deleteButton: {
        backgroundColor: "#C75146",
        color: "#FFFFFF",
        margin: "0",
        width: "calc(100%)"
    },
    newFrameButton: {
        marginTop: "10px",
        marginBottom: "25px",
        paddingRight: "25px",
        paddingLeft: "25px"
    },
    addIcon: {
        marginBottom: "25px"
    },
    toolsButton: {
        margin: "25px"
    },
    colorPicker: {
        margin: "0 auto"
    },
    SegmentBGColor: {
        backgroundColor: "#333333"
    },
    ToolBoxSegmentStyles: {
        display: "inline-block",
        padding: "5%",
        width: "100%",
        height: "auto"
    },
    FramesContainer: {
        overflowX: "scroll",
        display: "flex",
        flexDirection: "row"
    }
};

export default Styles;
