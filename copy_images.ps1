$src = 'C:\Users\aarti\.gemini\antigravity\brain\8090a97f-5ae1-439a-992a-1f3be2324751'
$dst = 'D:\WorkSpace\86B.ai\public'

$pairs = @(
  @('hero_slide1_boardroom_1782459498562.png','hero_slide1.png'),
  @('hero_slide2_datacenter_1782459510080.png','hero_slide2.png'),
  @('hero_slide3_analyst_1782459522634.png','hero_slide3.png'),
  @('hero_slide4_digitalagent_1782459533894.png','hero_slide4.png'),
  @('bento_genai_1782459575118.png','bento_genai.png'),
  @('bento_data_1782459587045.png','bento_data.png'),
  @('bento_finance_1782459599098.png','bento_finance.png'),
  @('bento_spatial_1782459610855.png','bento_spatial.png'),
  @('svc_genai_real_1782459633456.png','svc_genai.png'),
  @('svc_digital_human_real_1782459643491.png','svc_digital_human.png'),
  @('svc_automation_real2_1782459654381.png','svc_automation.png'),
  @('svc_revenue_real_1782459665968.png','svc_revenue.png'),
  @('svc_predictive_real_1782459685722.png','svc_predictive.png'),
  @('svc_investor_real_1782459714425.png','svc_investor.png'),
  @('svc_nlp_real_1782459727702.png','svc_nlp.png'),
  @('svc_vision_real_1782459739095.png','svc_vision.png'),
  @('svc_hr_real_1782459759549.png','svc_hr.png'),
  @('svc_german_real_1782459771622.png','svc_german.png'),
  @('svc_governance_real_1782459784293.png','svc_governance.png'),
  @('svc_testing_real_1782459807069.png','svc_testing.png'),
  @('svc_llm_infra_real_1782459820942.png','svc_llm_infra.png'),
  @('svc_mlops_real_1782459833091.png','svc_mlops.png'),
  @('svc_travel_real_1782459845215.png','svc_travel.png'),
  @('svc_digital_twins_real_1782459865273.png','svc_digital_twins.png'),
  @('bento_spatial_1782459610855.png','svc_spatial_ar.png'),
  @('svc_digital_twins_real_1782459865273.png','svc_immersive.png'),
  @('bento_data_1782459587045.png','svc_data_science.png')
)

foreach ($pair in $pairs) {
  $from = Join-Path $src $pair[0]
  $to   = Join-Path $dst $pair[1]
  Copy-Item $from $to -Force
  Write-Host "Copied $($pair[1])"
}
Write-Host "ALL 27 IMAGES DONE"
