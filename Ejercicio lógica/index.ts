import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { SerieCovidDead } from "./model/SerieCovidDead";
import { StateAndDead } from "./model/StateAndDeads";
import { calculationDeadsbyState, minAndMaxaccumulated } from "./calculationState";

const header: string =
  "UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,Population,date_12220,date_12320,date_12420,date_12520,date_12620,date_12720,date_12820,date_12920,date_13020,date_13120,date_2120,date_2220,date_2320,date_2420,date_2520,date_2620,date_2720,date_2820,date_2920,date_21020,date_21120,date_21220,date_21320,date_21420,date_21520,date_21620,date_21720,date_21820,date_21920,date_22020,date_22120,date_22220,date_22320,date_22420,date_22520,date_22620,date_22720,date_22820,date_22920,date_3120,date_3220,date_3320,date_3420,date_3520,date_3620,date_3720,date_3820,date_3920,date_31020,date_31120,date_31220,date_31320,date_31420,date_31520,date_31620,date_31720,date_31820,date_31920,date_32020,date_32120,date_32220,date_32320,date_32420,date_32520,date_32620,date_32720,date_32820,date_32920,date_33020,date_33120,date_4120,date_4220,date_4320,date_4420,date_4520,date_4620,date_4720,date_4820,date_4920,date_41020,date_41120,date_41220,date_41320,date_41420,date_41520,date_41620,date_41720,date_41820,date_41920,date_42020,date_42120,date_42220,date_42320,date_42420,date_42520,date_42620,date_42720,date_42820,date_42920,date_43020,date_5120,date_5220,date_5320,date_5420,date_5520,date_5620,date_5720,date_5820,date_5920,date_51020,date_51120,date_51220,date_51320,date_51420,date_51520,date_51620,date_51720,date_51820,date_51920,date_52020,date_52120,date_52220,date_52320,date_52420,date_52520,date_52620,date_52720,date_52820,date_52920,date_53020,date_53120,date_6120,date_6220,date_6320,date_6420,date_6520,date_6620,date_6720,date_6820,date_6920,date_61020,date_61120,date_61220,date_61320,date_61420,date_61520,date_61620,date_61720,date_61820,date_61920,date_62020,date_62120,date_62220,date_62320,date_62420,date_62520,date_62620,date_62720,date_62820,date_62920,date_63020,date_7120,date_7220,date_7320,date_7420,date_7520,date_7620,date_7720,date_7820,date_7920,date_71020,date_71120,date_71220,date_71320,date_71420,date_71520,date_71620,date_71720,date_71820,date_71920,date_72020,date_72120,date_72220,date_72320,date_72420,date_72520,date_72620,date_72720,date_72820,date_72920,date_73020,date_73120,date_8120,date_8220,date_8320,date_8420,date_8520,date_8620,date_8720,date_8820,date_8920,date_81020,date_81120,date_81220,date_81320,date_81420,date_81520,date_81620,date_81720,date_81820,date_81920,date_82020,date_82120,date_82220,date_82320,date_82420,date_82520,date_82620,date_82720,date_82820,date_82920,date_83020,date_83120,date_9120,date_9220,date_9320,date_9420,date_9520,date_9620,date_9720,date_9820,date_9920,date_91020,date_91120,date_91220,date_91320,date_91420,date_91520,date_91620,date_91720,date_91820,date_91920,date_92020,date_92120,date_92220,date_92320,date_92420,date_92520,date_92620,date_92720,date_92820,date_92920,date_93020,date_10120,date_10220,date_10320,date_10420,date_10520,date_10620,date_10720,date_10820,date_10920,date_101020,date_101120,date_101220,date_101320,date_101420,date_101520,date_101620,date_101720,date_101820,date_101920,date_102020,date_102120,date_102220,date_102320,date_102420,date_102520,date_102620,date_102720,date_102820,date_102920,date_103020,date_103120,date_11120,date_11220,date_11320,date_11420,date_11520,date_11620,date_11720,date_11820,date_11920,date_111020,date_111120,date_111220,date_111320,date_111420,date_111520,date_111620,date_111720,date_111820,date_111920,date_112020,date_112120,date_112220,date_112320,date_112420,date_112520,date_112620,date_112720,date_112820,date_112920,date_113020,date_12120,date_12220,date_12320,date_12420,date_12520,date_12620,date_12720,date_12820,date_12920,date_121020,date_121120,date_121220,date_121320,date_121420,date_121520,date_121620,date_121720,date_121820,date_121920,date_122020,date_122120,date_122220,date_122320,date_122420,date_122520,date_122620,date_122720,date_122820,date_122920,date_123020,date_123120,date_1121,date_1221,date_1321,date_1421,date_1521,date_1621,date_1721,date_1821,date_1921,date_11021,date_11121,date_11221,date_11321,date_11421,date_11521,date_11621,date_11721,date_11821,date_11921,date_12021,date_12121,date_12221,date_12321,date_12421,date_12521,date_12621,date_12721,date_12821,date_12921,date_13021,date_13121,date_2121,date_2221,date_2321,date_2421,date_2521,date_2621,date_2721,date_2821,date_2921,date_21021,date_21121,date_21221,date_21321,date_21421,date_21521,date_21621,date_21721,date_21821,date_21921,date_22021,date_22121,date_22221,date_22321,date_22421,date_22521,date_22621,date_22721,date_22821,date_3121,date_3221,date_3321,date_3421,date_3521,date_3621,date_3721,date_3821,date_3921,date_31021,date_31121,date_31221,date_31321,date_31421,date_31521,date_31621,date_31721,date_31821,date_31921,date_32021,date_32121,date_32221,date_32321,date_32421,date_32521,date_32621,date_32721,date_32821,date_32921,date_33021,date_33121,date_4121,date_4221,date_4321,date_4421,date_4521,date_4621,date_4721,date_4821,date_4921,date_41021,date_41121,date_41221,date_41321,date_41421,date_41521,date_41621,date_41721,date_41821,date_41921,date_42021,date_42121,date_42221,date_42321,date_42421,date_42521,date_42621,date_42721";

const headers: string[] = header.split(",");
const route: string = './archives/time_series_covid19_deaths_US.csv'; 

const readCSV = () => {
  const csvFilePath: string = path.resolve(
    __dirname,
    route
  );

  const fileContent: string = fs.readFileSync(csvFilePath, {
    encoding: "utf-8",
  });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
    },
    (error, result: SerieCovidDead[]) => {
      if (error) {
        console.error(error);
      } else {
        result.splice(0, 1);
        let arrayProvinceState: string[] = [];
        result.forEach((element) => {
          if (!arrayProvinceState.includes(element.Province_State)) {
            arrayProvinceState.push(element.Province_State);
          }
        });
        const calcDeadsbyState = calculationDeadsbyState(result, arrayProvinceState);
        const [MaxState, minState] = minAndMaxaccumulated(calcDeadsbyState);
        console.log(`1.El estado con mayor acumulado a la fecha es ${MaxState.name}`);
        console.log(`2.El Estado con menor acumulado a la fecha es ${minState.name}`);
        for (const state of calcDeadsbyState) {
            console.log(`3.El porcentaje de muertes es: ${state.percentDeath} de un total de población de: ${state.population} en el estado de: ${state.name}`);
        }
        console.log(`4. El estado más afectado es New York ya que presenta una población grande y una tasa de muertes muy alta`);
      }
    }
  );
};



readCSV();
