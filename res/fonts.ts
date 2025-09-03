import { Platform } from 'react-native';
import Config from 'react-native-config';
import { RFPercentage } from "react-native-responsive-fontsize";

export default {

    // size: {
    //     "_10px": RFPercentage(0.135 * 10),
    //     "_11px": RFPercentage(0.135 * 11),
    //     "_12px": RFPercentage(0.135 * 12),
    //     "_13px": RFPercentage(0.135 * 13),
    //     "_14px": RFPercentage(0.135 * 14),
    //     "_15px": RFPercentage(0.135 * 15),
    //     "_16px": RFPercentage(0.135 * 16),
    //     "_17px": RFPercentage(0.135 * 17),
    //     "_18px": RFPercentage(0.135 * 18),
    //     "_19px": RFPercentage(0.135 * 19),
    //     "_20px": RFPercentage(0.135 * 20),
    //     "_21px": RFPercentage(0.135 * 21),
    //     "_22px": RFPercentage(0.135 * 22),
    //     "_23px": RFPercentage(0.135 * 23),
    //     "_24px": RFPercentage(0.135 * 24),
    //     "_25px": RFPercentage(0.135 * 25),
    //     "_26px": RFPercentage(0.135 * 26),
    //     "_27px": RFPercentage(0.135 * 27),
    //     "_28px": RFPercentage(0.135 * 28),
    //     "_29px": RFPercentage(0.135 * 29),
    //     "_30px": RFPercentage(0.135 * 30),
    //     "_31px": RFPercentage(0.135 * 31),
    //     "_32px": RFPercentage(0.135 * 32),
    //     "_33px": RFPercentage(0.135 * 33),
    //     "_34px": RFPercentage(0.135 * 34),
    //     "_50px": RFPercentage(0.135 * 50),
    // },
    size: {
        "_10px": 10,
        "_11px": 11,
        "_12px": 12,
        "_13px": 13,
        "_14px": 14,
        "_15px": 15,
        "_16px": 16,
        "_17px": 17,
        "_18px": 18,
        "_19px": 19,
        "_20px": 20,
        "_21px": 21,
        "_22px": 22,
        "_23px": 23,
        "_24px": 24,
        "_25px": 25,
        "_26px": 26,
        "_27px": 27,
        "_28px": 28,
        "_29px": 29,
        "_30px": 30,
        "_31px": 31,
        "_32px": 32,
        "_33px": 33,
        "_34px": 34,
      "_40px": 40,
        "_50px": 50,
    },
    name: {

        Heavy: Config.COMPANY_ID == "199" ? 'Tajawal-Bold' : Platform.OS == "ios" ? 'EuclidCircular_Bold' : "EuclidCircular_Bold",
        regular: Config.COMPANY_ID == "199" ? 'Tajawal-Regular' : Platform.OS == "ios" ? 'EuclidCircular_Regular' : "EuclidCircular_Regular",
        // mediumbold: Platform.OS == "ios" ? 'SFProText-Bold' : "sf_pro_text_bold",
        medium: Config.COMPANY_ID == "199" ? 'Tajawal-Medium' : Platform.OS == "ios" ? 'EuclidCircular_Medium' : "EuclidCircular_Medium",
        semibold: Config.COMPANY_ID == "199" ? 'Tajawal-Medium' : Platform.OS == "ios" ? 'EuclidCircular_SemiBold' : "EuclidCircular_SemiBold",
        light: Config.COMPANY_ID == "199" ? 'Tajawal-Light' : Platform.OS == "ios" ? 'EuclidCircular_Light' : "EuclidCircular_Light",
        bold: Config.COMPANY_ID == "199" ? 'Tajawal-Bold' : Platform.OS == "ios" ? 'EuclidCircular_Bold' : "EuclidCircular_Bold",


        // Heavy: Config.COMPANY_ID == "199" ? 'Tajawal-Bold' : Platform.OS == "ios" ? 'DMSans-Bold' : "DMSans-Bold",
        // regular: Config.COMPANY_ID == "199" ? 'Tajawal-Regular' : Platform.OS == "ios" ? 'DMSans-Regular' : "DMSans-Regular",
      
        // medium: Config.COMPANY_ID == "199" ? 'Tajawal-Medium' : Platform.OS == "ios" ? 'DMSans-Medium' : "DMSans-Medium",
        // semibold: Config.COMPANY_ID == "199" ? 'Tajawal-Medium' : Platform.OS == "ios" ? 'DMSans-SemiBold' : "DMSans-SemiBold",
        // light: Config.COMPANY_ID == "199" ? 'Tajawal-Light' : Platform.OS == "ios" ? 'DMSans-Light' : "DMSans-Light",
        // bold: Config.COMPANY_ID == "199" ? 'Tajawal-Bold' : Platform.OS == "ios" ? 'DMSans-Bold' : "DMSans-Bold",
    }
    // family: {
    //     centraNo2
    //         : {
    //         centraLight: "CentraNo2-Light.ttf",
    //         centraRegular: "CentraNo2-Book.ttf",
    //         centraMedium: "CentraNo2-Medium.ttf",
    //         centraBold: "CentraNo2-Bold.ttf",
    //         centraHeavy: "CentraNo2-Extrabold.ttf"
    //     }
    // }
}