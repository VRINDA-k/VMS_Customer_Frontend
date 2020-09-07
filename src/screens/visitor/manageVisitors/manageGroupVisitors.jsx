import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CurvedButton from "../../../components/buttons/curvedButton";
import Typography from "@material-ui/core/Typography";

import { css } from "aphrodite";
import { style, styles, getModalStyle } from "./styles";
import Modal from "@material-ui/core/Modal";

class ManageGroupVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: null
    };
  }

  componentDidMount() {
    let params = {
      company_division: this.props.companyDivision
    };
    this.props.retrieveGroupVisitor(params);
  }

  onDeleteHandle = id => {
    this.props.deleteGroupVisitor(id);
  };

  componentDidUpdate = () => {
    if (this.props.deleteSuccess) {
      this.setState({
        isOpen: false
      });
      let params = {
        company_division: this.props.companyDivision
      };
      this.props.retrieveGroupVisitor(params);
    }
  };

  handleDeleteModalClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleDeleteModalOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handler = (id, name) => {
    this.props.onScheduleHandler(id, name, true);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid className={css(style.root)}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell
                  style={{ paddingRight: 100 }}
                  className={classes.actionHeader}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.groupVisitorData &&
                this.props.groupVisitorData.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.group_name}
                      </TableCell>
                      <TableCell numeric>
                        {
                          <Button
                            color="secondary"
                            className={css(styles.button)}
                            onClick={e => {
                              e.preventDefault();
                              this.setState({
                                id: item.id
                              });
                              this.handleDeleteModalOpen();
                            }}
                          >
                            DELETE
                          </Button>
                        }

                        {
                          <Button
                            style={{ float: "right" }}
                            color="secondary"
                            onClick={() =>
                              this.handler(item.id, item.group_name)
                            }
                          >
                            SCHEDULE
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
        <Modal open={this.state.isOpen} disableBackdropClick="true">
          <div style={getModalStyle()} className={classes.paper}>
            <Typography>Are you sure you want to delete this?</Typography>
            <Grid justify="flex-end" container>
              <Grid item xs={4}>
                <CurvedButton
                  value="Cancel"
                  variant="outlined"
                  color="secondary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleDeleteModalClose();
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <CurvedButton
                  value="Yes"
                  variant="contained"
                  color="secondary"
                  onClick={e => {
                    e.preventDefault();
                    this.onDeleteHandle(this.state.id);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Grid>
    );
  }
}

export default withStyles(styles)(ManageGroupVisitor);
