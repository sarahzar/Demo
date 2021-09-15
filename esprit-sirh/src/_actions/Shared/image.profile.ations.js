import { imageProfileConstants } from "../../_constants/imageProfileConstants"; 

export const imageProfileAtions = {
    setImage,
}

function setImage(path){
    return dispatch => {
        dispatch(setImageProfile(path))
    };
}
function setImageProfile(path) { return { type: imageProfileConstants.SET_IMAGE, path } }
