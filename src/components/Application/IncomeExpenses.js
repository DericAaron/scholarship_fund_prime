import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { editApplication } from '../../redux/actions/applicantActions';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  secondary: {
    position: 'fixed',
    right: 400,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  applicant: state.applicant,
});

class IncomeExpenses extends Component {

  handleChange = (key) => event => {
    this.props.dispatch(editApplication({key: key, value: event.target.value}))
  };

  componentDidMount() {
    console.log(this.props.applicant);
  }

    render() {
      const { classes } = this.props;

      return (
          <div>
              <Typography variant="title" className={classes.title}>
                Income & Expenses
              </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="What is your adjusted gross income?"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.adjusted_gross_income}
                          placeholder="$"
                          onChange={this.handleChange('adjusted_gross_income')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="What is your tax filing status?"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.filing_status}
                          placeholder="$"
                          onChange={this.handleChange('filing_status')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="How many dependents, if any, do you have?* (number, DNWTS)"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.dependents}
                          onChange={this.handleChange('dependents')}
                          type="number"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Are you getting government assistance?"
                      secondary={
                          <div>
                            <RadioGroup
                              value={this.props.applicant.government_assistance}
                              onChange={this.handleChange('government_assistance')}
                            >
                              <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                              <FormControlLabel value={'false'} control={<Radio />} label="No" />
                            </RadioGroup>
                            {this.props.applicant.government_assistance === "true" ? (
                              <TextField
                                fullWidth
                                placeholder="If so, please specify."
                                className={classes.formControl}
                                value={this.props.applicant.government_assistance_notes}
                                onChange={this.handleChange('government_assistance_notes')}
                              />
                            ) : (
                              null
                            )}
                          </div>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Do you plan to continue being employed while in Prime?"
                      secondary={
                          <div>
                            <RadioGroup
                              value={this.props.applicant.employed_during_prime}
                              onChange={this.handleChange('employed_during_prime')}
                            >
                              <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                              <FormControlLabel value={'false'} control={<Radio />} label="No" />
                            </RadioGroup>
                            {this.props.applicant.employed === "true" ? (
                              <TextField
                                fullWidth
                                placeholder="If so, how much do you estimate you will make per month?"
                                className={classes.formControl}
                                value={this.props.applicant.employedText}
                                onChange={this.handleChange('employedText')}
                              />
                            ) : (
                              null
                            )}
                          </div>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Do you need tuition assistance? If your tuition will be supplied through MSP TechHire/JFCS, select no."
                      secondary={
                          <div>
                            <RadioGroup
                              value={this.props.applicant.need_tuition}
                              onChange={this.handleChange('need_tuition')}
                            >
                              <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                              <FormControlLabel value={'false'} control={<Radio />} label="No" />
                            </RadioGroup>
                          </div>
                      }
                    />
                  </ListItem>
                  <Typography variant="title" className={classes.title}>
                    Expenses Per Month
                  </Typography>
                  <ListItem>
                    <ListItemText
                      primary="Rent/Mortgage"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.housing}
                          placeholder="$"
                          onChange={this.handleChange('housing')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Transportation, including vehicle or transit expenses"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.transportation}
                          placeholder="$"
                          onChange={this.handleChange('transportation')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Childcare Expenses"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.childcare}
                          placeholder="$"
                          onChange={this.handleChange('childcare')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Healthcare Expenses"
                      secondary={
                        <TextField
                          className={classes.formControl}
                          value={this.props.applicant.healthcare}
                          placeholder="$"
                          onChange={this.handleChange('healthcare')}
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Other Expenses"
                      secondary={
                        <TextField
                          id="multiline-flexible"
                          label="Please specify major monthly expenses (don’t feel the need to list absolutely everything)"
                          multiline
                          rowsMax="20"
                          value={this.props.applicant.other_expenses_notes}
                          onChange={this.handleChange('other_expenses_notes')}
                          fullWidth
                          margin="normal"
                        />
                      }
                    />
                  </ListItem>
                </List>
          </div>
      );
    }
}

IncomeExpenses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps),)(IncomeExpenses);
