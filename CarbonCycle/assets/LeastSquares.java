import java.io.*;

public class LeastSquares {

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
      // skip 1st two lines - headers
      String dataLine = in.readLine();  
      dataLine = in.readLine();  
      while ((dataLine = in.readLine()) != null) {
        String[] stats = dataLine.split("\\s+");
	  float ff1 = -1000f;
 	  try {
	  	ff1 = Float.valueOf(stats[2]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  float ff2 = -1000f;
 	  try {
	  	ff2 = Float.valueOf(stats[3]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  float ffSum = ff1 + ff2;
          // init to something ridiculous so we'll know right away visually if anything wrong
	  float fou = -1000f;
 	  try {
	  	fou = Float.valueOf(stats[6]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  fou = -fou;
	  float ftu = -1000f;
 	  try {
	  	ftu = Float.valueOf(stats[7]);
 	  } catch (NumberFormatException nfe) {
		nfe.printStackTrace();
	  }
	  ftu = -ftu;
	  System.out.println(stats[1].substring(0, 4) + " " + ftu);
        //out.write("  <data>\r\n");
         // out.write("    <year>" + stats[1].substring(0, 4) + "</year>\r\n");
          //out.write("    <fossilfuel>" + stats[2] + "</fossilfuel>\r\n");
          //out.write("    <otheremissions>" + stats[3] + "</otheremissions>\r\n");
          //out.write("    <landuse>" + stats[4] + "</landuse>\r\n");
          //out.write("    <atmosphericincrease>" + stats[5] + "</atmosphericincrease>\r\n");
	// need to reverse the sign on the next two, since they are sinks
   
          //out.write("    <oceanuptake>" + fou + "</oceanuptake>\r\n");
          //out.write("    <terrestrialuptake>" + ftu + "</terrestrialuptake>\r\n");
        //out.write("  </data>\r\n");
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
      System.out.println("Usage: java LeastSquares <input_file>");
    }

  }

}
