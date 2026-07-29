-- Fix PL/pgSQL ambiguity: RETURNS TABLE column "storage_path" shadowed unqualified selects.
create or replace function verify_download_token(p_token text)
returns table (
  success boolean,
  storage_path text,
  lead_source text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead leads%rowtype;
  v_path text;
begin
  select * into v_lead
  from leads
  where download_token = p_token
    and token_expires_at > now()
  limit 1;

  if not found then
    return query select false, null::text, null::text;
    return;
  end if;

  if v_lead.status = 'pending' then
    update leads
    set status = 'verified', verified_at = now()
    where id = v_lead.id;
  elsif v_lead.status <> 'verified' then
    return query select false, null::text, null::text;
    return;
  end if;

  if v_lead.source = 'intelligence_report' and v_lead.report_id is not null then
    select ir.download_storage_path into v_path
    from intelligence_reports ir
    where ir.id = v_lead.report_id;
  elsif v_lead.source in ('sample_download', 'weekly_sample') then
    select coalesce(
      (select wrf.storage_path from weekly_report_files wrf where wrf.kind = 'sample' limit 1),
      'weekly-reports/sample.xlsx'
    ) into v_path;
  else
    v_path := null;
  end if;

  if v_path is null or v_path = '' then
    return query select false, null::text, null::text;
    return;
  end if;

  return query select true, v_path, v_lead.source;
end;
$$;

revoke all on function verify_download_token(text) from public;
grant execute on function verify_download_token(text) to anon;
