import { Body, Controller, Get, Logger, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ReportsService, REPORT_STRATEGIES } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { RosGuard } from '../../guards/ros.guard';
import { Roles } from '../../guards/roles.decorator';
import * as _ from 'lodash';
import { AllExceptionsFilter } from '../../filters/exception.filter';

interface ReportParams {
  siteId: string;
  action: string;
  filters: string;
}

@Controller('report')
@UseGuards(RolesGuard)
@UseGuards(RosGuard)
@UseFilters(new AllExceptionsFilter())
export class ReportsController {
  constructor(
    private readonly reportService: ReportsService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {
  }

  @Get('/item-sales')
  @Get('/itemSales')
  @Roles('manager')
  getItems(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    return this.reportService.getReport('stp_ReportItems', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/salesByOrganizationAndUser')
  @Roles('manager')
  getSalesByUser(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    return this.reportService.getReport('stp_ApiSalesAndTips', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/budgetDeductions')
  @Roles('manager')
  getbudgetDeductions(@Req() request) {
    const params = {
      siteId: this._getOrganizationId(request),
      action: 'AvgReductionForBudget',
    };

    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/averageDeductionsByShift')
  @Roles('manager')
  getAverageDeductionsByShift(@Req() request, @Query() query) {
    const params = _.assign({
      siteId: this._getOrganizationId(request),
      action: 'AvgReductionForBudget_dev',
    }, _.pick(query, [
      'employeesPeriod', 'employeesType', 'fromTime', 'mrPeriod', 'mrType',
      'operationalPeriod', 'operationalType', 'salesPeriod', 'salesType',
      'toTime', 'voidsPeriod', 'voidsType', 'wastePeriod', 'wasteType',
    ]));

    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/payments')
  @Roles('manager')
  getPayments(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'payments';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/categories')
  @Roles('manager')
  getCategories(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'categories';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/tlogs')
  @Roles('manager')
  getTlogs(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'tlogs';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/refund')
  @Roles('manager')
  getRefund(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'refund';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/reductionByReason')
  @Roles('manager')
  getReductionByReason(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'reductionByReason';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/reductionByfiredBy')
  @Roles('manager')
  getReductionByFired(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'reductionByfiredBy';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/mostLeastSoldItems')
  @Roles('manager')
  getMostLeastSoldItems(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'mostLeastSoldItems';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/ReductionItemsByReason')
  @Roles('manager')
  getReductionItemsByReason(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'ReductionByReason';

    _.set(params, 'filters', JSON.parse(_.get(params, 'filters')));

    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/reductionItemsByfiredBy')
  @Roles('manager')
  getReductionItemsByFired(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'ReductionByFiredBy';

    _.set(params, 'filters', JSON.parse(_.get(params, 'filters')));

    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/mostReturnItems')
  @Roles('manager')
  getMostReturnItems(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'MostReturnItems';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/hqChefHomePage')
  @Roles('manager')
  gethqChefHomePage(@Query() params: ReportParams, @Req() request) {
    params.siteId = _.get(request, ['user', 'organization', 'id'], '');
    params.action = 'hqChefHomePage';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

  @Get('/refund')
  @Roles('manager')
  getRefuned(@Query() params: ReportParams, @Req() request) {
    params.siteId = this._getOrganizationId(request);
    params.action = 'refund';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }
  _getOrganizationId(request) {
    return _.get(request, 'headers.ros-organization', _.get(request, 'user.organization.id', ''));
  }

  @Get('/tabitChefsiteMonthly')
  @Roles('manager')
  getSales(@Query() params: ReportParams, @Req() request) {
    params.siteId = _.get(request, ['user', 'organization', 'id'], '');
    params.action = 'tabitChefsiteMonthly';
    return this.reportService.getReport('stp_getdwhDataApi', params, REPORT_STRATEGIES.STORED_PROCEDURE);
  }

}
