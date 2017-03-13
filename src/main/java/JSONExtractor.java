
import org.codehaus.jettison.json.JSONObject;
import org.codehaus.jettison.json.JSONException;
import java.io.*;

public class JSONExtractor {
    public static void main(String[] args) {
        // write your code here
        try{
            BufferedReader br = new BufferedReader(new FileReader("./"+args[0]+".json"));
            BufferedWriter bw = new BufferedWriter(new FileWriter("./input/"+args[0]));
            String s=null;
            while((s = br.readLine())!=null){
                try{
                    JSONObject data = new JSONObject(s);
                    String content = data.getString("content");
                    bw.write(content+"\n");
                    System.out.println(content);
                }catch (JSONException e){
                    e.printStackTrace();
                }
            }
            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
        }


    }
}
