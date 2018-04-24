import java.io.*;

public class CCDataToXML {

  public static void main(String[] args) {
     
    try {
      FileInputStream fin = new FileInputStream(args[0]);
      BufferedReader in 
       = new BufferedReader(new InputStreamReader(fin));
      
      FileOutputStream fout 
       = new FileOutputStream("data.xml");
      OutputStreamWriter out = new OutputStreamWriter(fout, "UTF-8");      
      out.write("<?xml version=\"1.0\"?>\r\n");  
      out.write("<dataset>\r\n");
      String dataLine = null;
      // skip 1st line - headers
      dataLine = in.readLine();  
      while ((dataLine = in.readLine()) != null) {
        System.err.println("Working on line: " + dataLine);
        String[] stats = dataLine.split("\\s+");
        for (int i = 0; i < stats.length; i++) {
		System.out.println("Field " + i + ": " + stats[i]);
	}
        out.write("  <data>\r\n");
          out.write("    <year>" + stats[0].substring(0, 4) + "</year>\r\n");
          out.write("    <fossilfuel>" + stats[1] + "</fossilfuel>\r\n");
          out.write("    <landuse>" + stats[2] + "</landuse>\r\n");
          out.write("    <atmosphericincrease>" + stats[3] + "</atmosphericincrease>\r\n");
	// need to reverse the sign on the next two, since they are sinks
   
          // init to something ridiculous so we'll know right away visually if anything wrong
	  float fou = -1000f;
 	  try {
	  	fou = Float.valueOf(stats[4]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  fou = -fou;
          out.write("    <oceanuptake>" + fou + "</oceanuptake>\r\n");
	  float ftu = -1000f;
 	  try {
	  	ftu = Float.valueOf(stats[5]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  ftu = -ftu;
          out.write("    <terrestrialuptake>" + ftu + "</terrestrialuptake>\r\n");
        out.write("  </data>\r\n");
      }  
      out.write("</dataset>\r\n");  
      out.close();
      in.close();
    }
    catch (IOException e) {
      System.err.println(e);
    }
    catch (ArrayIndexOutOfBoundsException e) {
	e.printStackTrace();
      System.out.println("Usage: java CCDataToXML <input_file>");
    }

  }

}
