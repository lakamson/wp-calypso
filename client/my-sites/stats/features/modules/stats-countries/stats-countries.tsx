import { StatsCard } from '@automattic/components';
import { localizeUrl } from '@automattic/i18n-utils';
import { mapMarker } from '@wordpress/icons';
import { useTranslate } from 'i18n-calypso';
import React from 'react';
import { useSelector } from 'calypso/state';
import {
	isRequestingSiteStatsForQuery,
	getSiteStatsNormalizedData,
} from 'calypso/state/stats/lists/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import EmptyModuleCard from '../../../components/empty-module-card/empty-module-card';
import { SUPPORT_URL } from '../../../const';
import Geochart from '../../../geochart';
import StatsModule from '../../../stats-module';
import StatsModulePlaceholder from '../../../stats-module/placeholder';

type StatCountriesProps = {
	className?: string;
	period: string;
	query: string;
	moduleStrings: {
		title: string;
		item: string;
		value: string;
		empty: string;
	};
};

const StatCountries: React.FC< StatCountriesProps > = ( {
	period,
	query,
	moduleStrings,
	className,
} ) => {
	const translate = useTranslate();
	const siteId = useSelector( getSelectedSiteId ) as number;
	const statType = 'statsCountryViews';

	const requesting = useSelector( ( state ) =>
		isRequestingSiteStatsForQuery( state, siteId, statType, query )
	);
	const data = useSelector( ( state ) =>
		getSiteStatsNormalizedData( state, siteId, statType, query )
	) as [ id: number, label: string ];

	return (
		<>
			{ requesting && <StatsModulePlaceholder isLoading={ requesting } /> }
			{ ( ! data || ! data?.length ) && (
				<StatsCard
					className={ className }
					title={ translate( 'Locations' ) }
					isEmpty
					emptyMessage={
						<EmptyModuleCard
							icon={ mapMarker }
							description={ translate(
								'Stats on visitors and their {{link}}viewing location{{/link}} will appear here to learn from where you are getting visits.',
								{
									comment: '{{link}} links to support documentation.',
									components: {
										link: <a href={ localizeUrl( `${ SUPPORT_URL }#countries` ) } />,
									},
									context: 'Stats: Info box label when the Countries module is empty',
								}
							) }
						/>
					}
				>
					<></>
				</StatsCard>
			) }
			{ data && !! data.length && (
				<StatsModule
					path="countryviews"
					moduleStrings={ moduleStrings }
					period={ period }
					query={ query }
					statType={ statType }
					showSummaryLink
					className={ className }
				>
					<Geochart query={ query } />
				</StatsModule>
			) }
		</>
	);
};

export default StatCountries;
