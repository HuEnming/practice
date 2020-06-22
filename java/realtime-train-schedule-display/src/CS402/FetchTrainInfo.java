package CS402;

import java.io.IOException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * Servlet implementation class FetchTrainInfo
 */
@WebServlet("/FetchTrainInfo")
public class FetchTrainInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String htmlHead = ("<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>Irish Rail Realtime</title>\n" +
            "    <!-- Required meta tags -->\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
            "\n" +
            "    <!-- Bootstrap CSS -->\n" +
            "    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\"\n" +
            "          integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">\n" +
            "</head>\n" +
            "<body>\n" +
            "<nav class=\"navbar navbar-expand-md navbar-info bg-info mb-4 navbar-dark\">\n" +
            "    <a class=\"navbar-brand\" href=\"#\">Irish Rail Realtime</a>\n" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
            "        <span class=\"navbar-toggler-icon\"></span>\n" +
            "    </button>\n" +
            "    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n" +
            "        <ul class=\"navbar-nav mr-auto\">\n" +
            "            <li class=\"nav-item active\">\n" +
            "                <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\n" +
            "            </li>\n" +
            "        </ul>\n" +
            "        <form class=\"form-inline my-2 my-lg-0\">\n" +
            "            <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\n" +
            "            <button class=\"btn btn-outline-light my-2 my-sm-0\" type=\"submit\">Search</button>\n" +
            "        </form>\n" +
            "    </div>\n" +
            "</nav>");

    private String htmlFoot = ("<!-- Optional JavaScript -->\n" +
            "<!-- jQuery first, then Popper.js, then Bootstrap JS -->\n" +
            "<script src=\"https://code.jquery.com/jquery-3.4.1.slim.min.js\"\n" +
            "        integrity=\"sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n\"\n" +
            "        crossorigin=\"anonymous\"></script>\n" +
            "<script src=\"https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js\"\n" +
            "        integrity=\"sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo\"\n" +
            "        crossorigin=\"anonymous\"></script>\n" +
            "<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\"\n" +
            "        integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\"\n" +
            "        crossorigin=\"anonymous\"></script>\n" +
            "</body>\n" +
            "</html>");


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		URL allStationsUrl = new URL("http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML");
        Document doc = Jsoup.parse(allStationsUrl, 5000);
        Elements stationDescs = doc.getElementsByTag("StationDesc");
        Elements stationCodes = doc.getElementsByTag("StationCode");
        response.setContentType("text/html;charset=UTF-8");
        String htmlBody = (
                "    <main role=\"main\" class=\"container\">\n" +
                        "        <div class=\"jumbotron\">\n" +
                        "            <h1>Get Train Times</h1>\n" +
                        "                <form action=\"" + request.getRequestURI() + "\" method=\"post\"><fieldset>\n" +
                        "                    <div class=\"form-group\">\n" +
                        "                        <label for=\"Station\">Station</label>\n" +
                        "                        <select id=\"station\" name=\"station\" class=\"form-control\">\n");
        for (int i = 0; i < stationDescs.size(); i++) {
            htmlBody += ("<option value=\"" + stationCodes.get(i).text() + "\">" + stationDescs.get(i).text() + "</option>");
        }
        htmlBody += ("                        </select>\n" +
                "                    </div>\n" +
                "                    <button type=\"submit\" class=\"btn btn-info\">Submit</button>\n" +
                "                </fieldset></form>\n" +
                "        </div>\n" +
                "    </main>\n");

        response.getWriter().write(htmlHead + htmlBody + htmlFoot);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String stationCode = request.getParameter("station");
        URL stationsDateUrl = new URL("http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=" + stationCode + "&NumMins=90&format=xml");
        Document doc = Jsoup.parse(stationsDateUrl, 5000);
        Elements traincodes = doc.getElementsByTag("Traincode");
        Elements origins = doc.getElementsByTag("Origin");
        Elements destinations = doc.getElementsByTag("Destination");
        Elements exparrivals = doc.getElementsByTag("Exparrival");
        Elements expdeparts = doc.getElementsByTag("Expdepart");
        response.setContentType("text/html;charset=UTF-8");
        String htmlBody = ("<main role=\"main\" class=\"container\">\n" +
                "        <div class=\"jumbotron\">\n" +
                "            <h1>Train Times Results</h1>\n" +
                "            <table class=\"table table-light\">\n" +
                "                <thead>\n" +
                "                <tr>\n" +
                "                    <th scope=\"col\">#</th>\n" +
                "                    <th scope=\"col\">Train Code</th>\n" +
                "                    <th scope=\"col\">Origin</th>\n" +
                "                    <th scope=\"col\">Destination</th>\n" +
                "                    <th scope=\"col\">Expected Arrival Time</th>\n" +
                "                    <th scope=\"col\">Expected Departure Time</th>\n" +
                "                </tr>\n" +
                "                </thead>\n" +
                "                <tbody>\n");
        for (int i = 0; i < traincodes.size(); i++) {
            htmlBody += ("<tr><th scope=\"row\">" + (i + 1) + "</th><td>" + traincodes.get(i).text() + "</td><td>" + origins.get(i).text() + "</td><td>" + destinations.get(i).text() + "</td><td>" + exparrivals.get(i).text() + "</td><td>" + expdeparts.get(i).text() + "</td></tr>");
        }

        htmlBody += ("                </tbody>\n" +
                "            </table><div class=\"mx-auto\" style=\"width: 200px;\"><a href=\""+ request.getRequestURI() +"\" class=\"btn btn-info\" role=\"button\" >Back</a></div>\n" +
                "        </div>\n" +
                "    </main>");
        response.getWriter().write(htmlHead + htmlBody + htmlFoot);
	}

}
