/* eslint-disable max-len */

/**
 * This library holdes all the regex we will be using in this project
 * @class RegexLibrary
 */
export class RegexLibrary {
    public static MAIL =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    public static PASSWORD = /^(?=.*[0-9])(?=.*[a-z]).{8,32}$/;

    public static TEMPLATE_HEADER_ADD_VARIABLE = /{{[1]}}/;
  
    public static TEMPLATE_BODY_ADD_VARIABLE = /({{\d?\d}})/gm;
  
    public static PHONE_NUMBER = /^[0-9\b]+$/;
  
    public static URL =
      /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  
    public static GUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  
    /** Deny Instanciation of this Class */
    constructor() {
      throw new Error(
        'Cannot instantiate this Class, please use only for static members',
      );
    }
  }
  