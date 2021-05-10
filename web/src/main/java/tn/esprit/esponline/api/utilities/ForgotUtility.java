package tn.esprit.esponline.api.utilities;

import javax.servlet.http.HttpServletRequest;

public class ForgotUtility {

    public static String getSiteUrl(HttpServletRequest request){

        String siteUrl=request.getRequestURL().toString();
        return siteUrl.replace(request.getServletPath(),"");
    }
}
