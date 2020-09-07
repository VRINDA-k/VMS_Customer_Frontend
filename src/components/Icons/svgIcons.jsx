import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import SvgIcon from "@material-ui/core/SvgIcon";

export function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
{
  /* <path d="" /> */
}
export const SteeringIcon = props => {
  return (
    <SvgIcon {...props}>
      <path
        d="M240,216c-26.469,0-48,21.531-48,48s21.531,48,48,48s48-21.531,48-48S266.469,216,240,216z M240,296 
c-17.645,0-32-14.352-32-32s14.355-32,32-32s32,14.352,32,32S257.645,296,240,296z"
      />
      <path
        d="M240,0C107.664,0,0,107.664,0,240s107.664,240,240,240s240-107.664,240-240S372.336,0,240,0z M240,464 
C116.484,464,16,363.516,16,240S116.484,16,240,16s224,100.484,224,224S363.516,464,240,464z"
      />
      <path
        d="M240,48C134.133,48,48,134.133,48,240s86.133,192,192,192s192-86.133,192-192S345.867,48,240,48z M240,64 
c74.785,0,138.781,46.905,164.228,112.825l-59.938,19.979c-20.559,6.852-42.785,5.781-62.602-3.031 
c-26.492-11.781-56.887-11.781-83.371,0l-3.031,1.344c-18.016,8.016-38.441,9.633-57.512,4.547L73.672,182.57 
C97.54,113.646,163.061,64,240,64z M64,240c0-1.63,0.079-3.241,0.124-4.86l5.556,1.852 
c78.876,26.291,134.657,95.203,144.579,177.107C129.373,401.603,64,328.302,64,240z M240,416c-3.177,0-6.332-0.095-9.468-0.262 
c-9.454-89.602-69.874-165.284-155.79-193.918l-9.406-3.135c0.857-7.06,2.118-13.995,3.788-20.774l64.524,17.207 
c8.648,2.305,17.527,3.453,26.398,3.453c14.297,0,28.559-2.969,41.734-8.828l3.031-1.344c22.359-9.953,48.008-9.945,70.398,0.008 
c23.457,10.414,49.785,11.695,74.141,3.57l59.939-19.98c2.456,8.647,4.265,17.559,5.373,26.688l-9.406,3.135 
c-85.917,28.634-146.336,104.316-155.79,193.918C246.332,415.905,243.177,416,240,416z M265.742,414.099 
c9.922-81.904,65.702-150.816,144.579-177.107l5.556-1.852c0.044,1.619,0.124,3.23,0.124,4.86 
C416,328.302,350.627,401.603,265.742,414.099z"
      />
    </SvgIcon>
  );
};