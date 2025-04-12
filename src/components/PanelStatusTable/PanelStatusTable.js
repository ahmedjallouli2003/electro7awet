import React, {Component} from 'react';
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './PanelStatusTable.css';

import WeatherSection from '../WeatherSection/WeatherSection';

const WeatherFormSection = () => {
  return (
    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '1.5em' }}>
        <Icon name="cloud" color="blue" /> Weather Information
      </h3>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '1.1em', marginRight: '10px' }}>City:</label>
          <input type="text" placeholder="Enter city name" style={{ padding: '5px', fontSize: '1em' }} />
        </div>
        <Button color="blue" onClick={() => alert('Fetching weather data...')}>
          Get Weather
        </Button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '1.1em' }}>Temperature: 25°C</p>
        <p style={{ fontSize: '1.1em' }}>Humidity: 60%</p>
        <p style={{ fontSize: '1.1em' }}>Wind Speed: 15 km/h</p>
      </div>
    </div>
  );
};

class PanelStatusTable extends Component {
  handleCheckboxChange(event, data) {
    const checkboxMarked = data.checked,
      panelId = data.name;

    if (checkboxMarked === true) {
      this.props.enablePanels([panelId]);
    } else {
      this.props.disablePanels([panelId]);
    }
  }

  enableAllPanels(event, data) {
    const panelIds = PanelStatusTable.getPanelIds(this.props.panels);
    this.props.enablePanels(panelIds);
  }

  disableAllPanels(event, data) {
    const panelIds = PanelStatusTable.getPanelIds(this.props.panels);
    this.props.disablePanels(panelIds);
  }

  allPanelsAreEnabled() {
    return this.props.panels.every((panel) => {
      return (panel.enabled === true);
    });
  }

  allPanelsAreDisabled() {
    return this.props.panels.every((panel) => {
      return (panel.enabled === false);
    });
  }

  static getPanelIds(panels) {
    return panels.map((panel) => panel.id);
  }

  static forkOnGitHub() {
    window.location.assign('https://github.com/gitname/solar-ui');
  }

  render() {
    const rows = this.props.panels.map((panel) => {
      return (
        <Table.Row key={panel.id}>
          <Table.Cell collapsing>
            <Checkbox slider checked={panel.enabled} name={'' + panel.id}
                      onChange={this.handleCheckboxChange.bind(this)}/>
          </Table.Cell>
          <Table.Cell className="panel-status-table--data-cell"><a title={'View Panel ' + panel.id + ' details'}>{panel.id}</a></Table.Cell>
          <Table.Cell disabled={!panel.enabled} className="panel-status-table--data-cell">{panel.inputRadianceKWM2.toFixed(2)} kW/m²</Table.Cell>
          <Table.Cell disabled={!panel.enabled} className="panel-status-table--data-cell">{panel.outputVoltageV.toFixed(2)} V</Table.Cell>
          <Table.Cell disabled={!panel.enabled} className="panel-status-table--data-cell">{panel.outputCurrentA.toFixed(2)} A</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className="panel-status-table--wrapper">

        <Table unstackable celled compact definition className='panel-status-table--table'>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Enabled</Table.HeaderCell>
              <Table.HeaderCell>Panel</Table.HeaderCell>
              <Table.HeaderCell>Solar Radiance</Table.HeaderCell>
              <Table.HeaderCell>Output Voltage</Table.HeaderCell>
              <Table.HeaderCell>Output Current</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{rows}</Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Button.Group size='small'>
                  <Button basic color='green' disabled={this.allPanelsAreDisabled()} onClick={this.disableAllPanels.bind(this)}>Disable All</Button>
                  <Button color='green' disabled={this.allPanelsAreEnabled()} onClick={this.enableAllPanels.bind(this)}>Enable All</Button>
                </Button.Group>

                <Button size='small' color='green' icon labelPosition='left' floated='right'
                        onClick={PanelStatusTable.forkOnGitHub}>
                  <Icon name='fork'/> Weekly Power Report
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

      </Table>


    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '1.5em' }}>
        <Icon name="cloud" color="blue" /> Weather Information
      </h3>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '1.1em', marginRight: '10px' }}>City:</label>
          <input type="text" placeholder="Enter city name" style={{ padding: '5px', fontSize: '1em' }} />
        </div>
        <Button color="blue" onClick={() => alert('Fetching weather data...')}>
          Get Weather
        </Button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '1.1em' }}>Temperature: 25°C</p>
        <p style={{ fontSize: '1.1em' }}>Humidity: 60%</p>
        <p style={{ fontSize: '1.1em' }}>Wind Speed: 15 km/h</p>
      </div>
    </div>

      <WeatherSection />
      <WeatherFormSection />
    </div>
  );
}
}

PanelStatusTable.propTypes = {
  panels: PropTypes.array.isRequired,
  enablePanels: PropTypes.func.isRequired,
  disablePanels: PropTypes.func.isRequired
};

export default PanelStatusTable;
